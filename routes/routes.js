const homeRouter = require('./homeRouter.js');
const loginRouter = require('./loginRouter.js');
const registerRouter = require('./registerRouter.js');
const expensesRouter = require('./expensesRouter.js');
const notFoundRouter = require('./notFoundRouter.js');

const auth = require('../middlewares/auth.js');

const routes = [homeRouter, loginRouter, registerRouter, expensesRouter];

const initRouter = (app) => {
  app.use(auth);

  routes.forEach((r) => app.use(r));

  notFoundRouter(app);

  app.use((err, req, res, next) => {
    if (err) {
      res.redirect('/');
    }
  });
};

module.exports = initRouter;
