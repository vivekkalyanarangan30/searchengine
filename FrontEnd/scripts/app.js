    // App module
    //
    // The app module will contain all of the components the app needs (directives,
    // controllers, services, etc.). Since it will be using the components within
    // the elasticsearch module, define it a dependency.
    var SmartSearch = angular.module('SmartSearch', ['elasticsearch', 'ui.bootstrap','ngSanitize']);

    // Service
    //
    // esFactory() creates a configured client instance. Turn that instance
    // into a service so that it can be required by other parts of the application
    SmartSearch.service('client', function (esFactory) {
      return esFactory({
        host: 'localhost:9200',
        apiVersion: '2.3',
        log: 'error'
      });
    });

    // Controller
    //
    // It requires the "client" service, and fetches information about the server,
    // it adds either an error or info about the server to $scope.
    //
    // It also requires the esFactory to that it can check for a specific type of
    // error which might come back from the client
    SmartSearch.controller('SmartSearchController', function ($scope, client, esFactory) {
	
		$scope.sortType     = 'fields._score'; // set the default sort type
	    $scope.sortReverse  = false;  // set the default sort order
	    //$scope.searchFish   = '';     // set the default search/filter term
			
		$scope.search_click = function() {
			search_query = $scope.search_query;
			
			client.search({
				  index: 'wiki_search',
				  type: 'data',
				  body: {
					"fields" : ["name"],
					"query": {
						"bool": {
							"should": [
								{ 
									"multi_match": {
										"query":       search_query,
										"fields":    [ "text","name"],
										"type":        "best_fields",
										"tie_breaker": 0.5
									}
								}
								],
					"minimum_should_match" : 1
					}
				  }
				}

				}
				
				).then(function(response){
					$scope.search_res = response["hits"]["hits"];
					console.log(response);
					$scope.error = null;
				})
				.catch(function (err) {
				$scope.search_res = null;
				$scope.error = err;});
				
				client.index({
					index: "wiki_search",
					type: "index_type_suggest",
					body: {
						"search_query": {
							"input" : [search_query]
						}
					}
				});
		};

		
		$scope.autocomplete = function(val) {
		  var keywords = [];
		  keywords.push(val);
		  // THIS RETURN IS VERY IMPORTANT 
		  return client.suggest({
			 index: 'wiki_search',
			 size: 5,
			 body: {
				"index_type_suggest" : {
					"text" : val,
					"completion" : {
						"field" : "search_query"
					}
				}
			}
		  }).then(function (response) {
			  
			 for (var i in response['index_type_suggest'][0]['options']) {
				keywords.push(response['index_type_suggest'][0]['options'][i]['text']);
			 }
			 return keywords;
		  });
		}
		
		$scope.filter_by = function(field) {
			//console.log(field);
			//console.log($scope.g[field]);
			if ($scope.g[field] === '') {
				 delete $scope.f['__' + field];
				 return;
			}
			$scope.f['__' + field] = true;
			$scope.search_res.forEach(function(v) { v['__' + field] = v[field] < $scope.g[field]; })
		  }
		  
		
	  $scope.makeTodos = function() {
		$scope.todos = [];
		for (i=1;i<=1000;i++) {
		  $scope.todos.push({ text:"todo "+i, done:false});
		}
	  };
	  $scope.makeTodos(); 

	  $scope.$watch("currentPage + numPerPage", function() {
		var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		, end = begin + $scope.numPerPage;

		$scope.filteredTodos = $scope.todos.slice(begin, end);
	  });
		
      });