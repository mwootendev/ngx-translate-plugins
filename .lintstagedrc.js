module.exports = {
  "src/**/*.ts": [
    "prettier --write",
    files => `ng lint ngx-translate-plugins --fix`
  ],
  "projects/testing/src/**/*.ts": [
    "prettier --write",
    files => `ng lint testing --fix`
  ]
}
