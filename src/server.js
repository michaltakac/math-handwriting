const path = require('path');
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './src' });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // Fix style.css path, see: https://github.com/zeit/next.js/pull/3722
    server.use(
      '/_next/static',
      express.static(path.resolve(__dirname, '.next/static'))
    );

    server.get('/u/:id', (req, res) => {
      const actualPage = '/user';
      const queryParams = { id: req.params.id };

      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Listening on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(`> ${ex.stack}`);
    process.exit(1);
  });
