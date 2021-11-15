module.exports = {
  "src/**/*.ts": [
    "prettier --write",
    files => `ng lint ngx-translate-plugins --fix ${files.map((file) => `--files ${file}`).join(' ')}`,
    "git add"
  ],
  "projects/testing/src/**/*.ts": [
    "prettier --write",
    files => `ng lint testing --fix ${files.map((file) => `--files ${file}`).join(' ')}`,
    "git add"
  ]
}
