#!/bin/sh

PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]');
rm -rf gh-pages;
git clone `git config --get remote.origin.url` gh-pages;
cd gh-pages;
git checkout gh-pages;
cd ..;

echo "**Update documentation**: $PACKAGE_VERSION" >> gh-pages/CHANGES.md;

cd gh-pages;
git add .;
git commit -m "Docs updated to version $PACKAGE_VERSION";
git push origin gh-pages;
cd ..;
rm -rf gh-pages;
