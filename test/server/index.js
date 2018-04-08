#!/usr/bin/env node
const express = require(`express`);
const compression = require(`compression`);
const path = require(`path`);

const rootPath = path.resolve(__dirname, `..`, `..`);
const publicPath = path.join(rootPath, `public`);

const app = express();

app.use(compression());
app.use(`/`, express.static(publicPath, { index: false }));

app.get(`/*`, (request, response) => {
  response.sendFile(path.join(publicPath, `index.html`));
});

app.listen(8080);
