.PHONY: dev build deploy build-deploy

dev:
	docker-compose run --rm --service-ports web npx parcel serve ./src/index.html

build:
	rm -rf ./dist/*
	docker-compose run --rm web npx parcel build --no-optimize ./src/index.html

deploy:
	ssh storm "rm -rf /opt/cv/*"
	rsync -rv ./dist/ storm:/opt/cv

build-deploy: build deploy
