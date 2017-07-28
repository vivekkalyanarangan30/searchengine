# -*- coding: utf-8 -*-
"""
Created on Sun Jun 19 01:51:47 2016

@author: vk046010
"""
import requests

settings = '''
{
"settings" : {
    "analysis" : {
        "filter": {
                "trigrams_filter": {
                    "type":     "ngram",
                    "min_gram": 5,
                    "max_gram": 8
                }
            },
        "analyzer" : {
            "stem" : {
                "tokenizer" : "standard",
                "filter" : ["standard", "lowercase", "stop", "porter_stem","trigrams_filter"]
            },
            "my_ngram_analyzer" : {
              "tokenizer" : "my_ngram_tokenizer"
            }
        },
        "tokenizer" : {
            "my_ngram_tokenizer" : {
                "type" : "nGram",
                "min_gram" : "4",
                "max_gram" : "8"
            }
        }
    }
},
"mappings" : {
    "index_type_1" : {
        "dynamic" : true,
        "properties" : {
            "text" : {
                "type" : "string",
                "analyzer" : "stem"
            },
            "name" : {
                "type" : "string",
                "analyzer" : "simple"
            }
         }
      },
    "index_type_suggest" : {
        "properties" : {
            "search_query" : {
                "type" : "completion"
            }
         }
      }
   }
}
'''
url = 'http://192.168.99.100:9200/wiki_search'
#resp_del = requests.delete(url)
#print resp_del
resp = requests.put(url,data=settings)
print resp