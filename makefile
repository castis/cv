build:
	docker-compose run --rm web npm run build

dev:
	docker-compose run --rm --service-ports web parcel serve src/index.html

deploy:
	rsync --delete -rv ./dist/ storm:/opt/cv
