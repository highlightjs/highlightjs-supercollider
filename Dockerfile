FROM node:alpine

WORKDIR /highlightjs/

RUN apk add git

RUN git clone --depth 1 --branch 11.7.0 https://github.com/highlightjs/highlight.js.git

RUN cd /highlightjs/highlight.js && npm install

COPY package.json /highlightjs/sclang/package.json
COPY package-lock.json /highlightjs/sclang/package-lock.json

RUN cd sclang && npm install

ENV ONLY_EXTRA=true

RUN ln -s /highlightjs/sclang /highlightjs/highlight.js/extra/sclang 

RUN cd /highlightjs/highlight.js node ./tools/build.js -t node

WORKDIR "/highlightjs/sclang"

COPY . /highlightjs/sclang

CMD [ "/bin/sh", "-c", "cd /highlightjs/highlight.js && node ./tools/build.js -t cdn" ]
