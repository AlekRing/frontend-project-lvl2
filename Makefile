# Makefile

install:
	npm ci

lint:
	npx eslint .

test:
	npm test

gendiff:
	node bin/gendiff.js;

publish:
	npm publish --dry-run