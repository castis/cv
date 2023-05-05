.PHONY: build deploy

build:
	rm -rf ./dist
	mkdir ./dist
	docker-compose run --rm web npm run build

deploy:
	rsync --delete -rv ./dist/ storm:/opt/cv
