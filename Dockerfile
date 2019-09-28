FROM ubuntu:18.04

RUN apt-get update && apt-get install -y && \
	apt-get upgrade -y && \
	apt-get install git -y && \
	apt-get install curl wget -y && apt-get install -y && \
	apt-get install gnupg -y && \
	apt-get clean

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
	apt-get install -y nodejs

LABEL ntm-curd.version=1.0.21

RUN ln -fs /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get install -y tzdata
RUN dpkg-reconfigure --frontend noninteractive tzdata

WORKDIR /app

RUN git clone https://github.com/PharbersDeveloper/ntm-curd.git 

WORKDIR /app/ntm-curd

RUN npm install && \
	npm run build && \
	mkdir -p log && \
	mkdir -p tmp

EXPOSE 8080

ENTRYPOINT ["npm", "run", "start"]
