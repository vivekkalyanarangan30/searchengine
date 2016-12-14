# -*- coding: utf-8 -*-
"""
Created on Sun Jun 19 02:42:23 2016

@author: vk046010
"""

import pandas as pd
import numpy as np
import json
import time
from elasticsearch import Elasticsearch

start_time = time.time()
es = Elasticsearch([{'host': 'localhost', 'port': 9200}])

start_time = time.time()
data = pd.read_csv('people_wiki.csv')

print 'Data prepared in ' + str((time.time()-start_time)/60) + ' minutes'

json_body = data.reset_index().to_json(orient='index')
json_body = json_body.decode('ascii','ignore').encode('utf-8','replace')
json_parsed = json.loads(json_body)
print np.shape(data)
for elements in json_parsed:
    data_json = json_parsed[elements]
    id_ = data_json['URI']
    es.index(index='wiki_search', doc_type='data', id=id_, body=data_json)
    print id_ + ' indexed successfully'
print 'Indexed in '+str((time.time()-start_time)/60)+' minutes'