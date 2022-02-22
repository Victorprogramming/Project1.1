const { render, components } = require('../views/views.js');

const notFoundRouter = (app) => {
  app.get('*', (req, res) => {
    res.send(render({ component: components.notFound, user: req.user }));
  });
};

module.exports = notFoundRouter;
