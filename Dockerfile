FROM continuumio/anaconda:4.4.0
MAINTAINER Vivek Kalyanarangan, https://machinelearningblogs.com/about/
RUN apt-get update \
	&& apt-get install -y openjdk-7-jre
RUN wget https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-2.3.2.deb \
	&& apt-get update \
	&& dpkg -i elasticsearch-2.3.2.deb \
	&& update-rc.d elasticsearch defaults
RUN apt-get install -y apache2
COPY /FrontEnd /var/www/html
COPY /data /usr/local/searchengine/data
COPY /python /usr/local/searchengine/python
WORKDIR /usr/local/searchengine
RUN pip install -r ./python/requirements.txt
COPY ./elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml
WORKDIR /usr/local/searchengine
CMD /usr/share/elasticsearch/bin/elasticsearch -d -Des.insecure.allow.root=true \
	&& long-command & sleep 20; python ./python/config.py \
	&& service apache2 start \
	&& python ./python/indexing.py \
	&& tail -f /usr/share/elasticsearch/config/elasticsearch.yml