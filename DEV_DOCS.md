- [Release](#release)

# Release

0. For major version, search for `@breaking-change` to make sure all breaking changes are covered.

To start a new release (publish the framework packages on NPM) you need:

1. create a new release branch called `release/{version}` where {version} is in `1.6.0` format ->  ``` git checkout -b release/{version} ```
2. `npm run build:lib` to make sure the lib is building
3. MANUALLY update a version in main ./package.json & in ./projects/angular2-smart-table/package.json
4. MANUALLY copy the CHANGELOG.md from the root dir to ./projects/angular2-smart-table/src/
5. commit with `release/{version}` message ->  ``` git commit -m release/{version} ```
6. push, create PR, approve & merge
7. pull changes and release with `npm run publish`
8. update docs with `npm run docs:gh-pages`
9. create git tag `{version}` and push it with `git push --tags`
