.PHONY: docker-container
docker-container:
	docker build -t sc-highlightjs .

.PHONY: dev
dev:
	python3 -m http.server

.PHONY: build-docker
build-docker: docker-container
	mkdir -p dist
	docker run --volume "`pwd`/dist:/highlightjs/sclang/dist" sc-highlightjs

.PHONY: test-docker
test-docker: docker-container
	docker run sc-highlightjs npm run test

.PHONY: clean
clean:
	rm -rf dist
