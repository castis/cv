.PHONY: build deploy

start:
	docker-compose run --rm --service-ports web npm run start

build:
	rm -rf ./dist
	mkdir ./dist
	docker-compose run --rm web npm run build

deploy:
	rsync --delete -rv ./dist/ storm:/opt/cv
