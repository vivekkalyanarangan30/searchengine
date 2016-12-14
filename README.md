# searchengine
How to build an end to end search engine using elasticsearch and angularjs

This contains the code for the search engine. It will be quite powerful and industrial strength.

I have blogged about it in a multi-part series walkthrough explaining the finer details - 
http://machinelearningblogs.com/2016/12/how-to-build-a-search-engine-part-1/
http://machinelearningblogs.com/2016/12/how-to-build-a-search-engine-part-2/
http://machinelearningblogs.com/2016/12/how-to-build-a-search-engine-part-3/
http://machinelearningblogs.com/2016/12/how-to-build-a-search-engine-part-4/

I am open to pull requests if anyone wishes to extend it.

This has been done using Apache Tomcat, Elasticsearch, AngularJS and python (for ease of configuration only).

Some of the interesting properties are - 
Fuzzy Search
Subset Pattern Matching
Auto-complete suggestions
Scoring Algorithm
Further Sorting and filtering the results

It can be made plug n play style if you know the right components to tweak.

The data for the search engine is available here in case you want an exact replica - https://drive.google.com/open?id=0B_-Qs9TMzKukQURiR2xxdDVXYms

Everything else will be available here itself.

# Setup
1. install elasticsearch, python 2.7 anaconda distribution [details available in Part 1 of the blog]
2. Start elasticsearch
3. run config.python
4. run indexing.py (data has to be in the same folder as indexing.py - or you can change the name/location in the script)
5. Put the FrontEnd folder in the webapps folder of tomcat and start tomcat

Everything should be accessible from http://localhost:8080/FrontEnd - assuming everything is locally installed and tomcat is running on port 8080