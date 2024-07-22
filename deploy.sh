#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:marcosHenrique-developer/search-cep.git master:gh-pages

cd -