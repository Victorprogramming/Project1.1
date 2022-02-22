const { categories } = require('../utils/utils.js');

const home = ({ user, path }) => {
  let page = `<p class="guest-message">MoneyGone? The best expense tracker tool of all time!<br />Аre you new here? <a href="/register">Register</a> yourself!</p>`;
  if (user) {
    page = `<section class="actions">
      <form action="/" method="POST">
        <h2>Salary time? Refill your account amount.</h2>
        <input type="text" id="refillAmount" name="refillAmount"/>
        <button type="submit">Refill</button>
      </form>
      <div>
        <h2>New expense comming up?</h2>
        <a href="/add">Add it now</a>
      </div>
    </section>
    <hr class="separator" />
    ${
      user.expenses && user.expenses.length
        ? `<table class="expenses">
          <thead><tr><th>Merchant</th><th>Amount</th><th>Category</th><th>Description</th></tr></thead>
          <tbody>
            ${user.expenses
              .map(
                ({ _id, merchant, total, category, description, report }) =>
                  `<tr>
                    <td><p>${merchant}</p>${
                    report ? `<div class="report"><a href="/information/${_id}">Report</a></div>` : ''
                  }</td>
                    <td><img src="${path}images/amount.png" alt="" /><p>лв ${total.toFixed(2)}</p></td>
                    <td><img src="${path}images/category.png" alt="" /><p>${category}</p></td>
                    <td><img src="${path}images/hastag.png" alt="" /><p>${description}</p></td>
                  </tr>`
              )
              .join('')}
          </tbody>
        </table>`
        : '<h1 class="no-expenses">No expenses founded so far.. <span>GOOD JOB!</span></h1>'
    }`;
  }

  return page;
};

const login = ({ data }) => {
  let username = (password = '');
  if (data) {
    ({ username, password } = data);
  }

  return `<form action="/login" method="POST">
    <h1>Login</h1>
    <p>Personal info</p>
    <label for="usernmae">Username</label>
    <input id="username" name="username" type="text" placeholder="JustMyself123..." value="${username}" />
    <label for="usernmae">Password</label>
    <input id="password" name="password" type="password" placeholder="********" value="${password}" />
    <button type="submit">Login</button>
  </form>`;
};

const register = ({ data }) => {
  let username = (password = rePassword = amount = '');
  if (data) {
    ({ username, password, rePassword, amount } = data);
  }

  return `<form action="/register" method="POST">
    <h1>Register</h1>
    <p>Personal info</p>
    <label for="username">Username</label>
    <input id="username" name="username" type="text" placeholder="JustMyself123..." value="${username}"/>
    <label for="usernmae">Password</label>
    <input id="password" name="password" type="password" placeholder="******" value="${password}"/>
    <label for="rePassword">Repeat Password</label>
    <input id="rePassword" name="rePassword" type="password" placeholder="******" value="${rePassword}"/>
    <hr>
    <p>Account</p>
    <label for="amount">Amount</label>
    <input id="amount" name="amount" type="text" placeholder="$125.90" value="${amount}"/>
    <button type="submit">Register</button>
  </form>`;
};

const add = ({ data }) => {
  let merchant = (total = category = description = report = '');
  if (data) {
    ({ merchant, total, category, description, report } = data);
  }

  const categoriesOptions = Object.entries(categories)
    .map(([val, name]) => `<option ${category === val ? 'selected' : ''} value="${val}">${name}</option>`)
    .join('');

  return `<form action="/add" method="POST">
    <h1>Expense</h1>
    <div class="form-control">
      <label for="merchant">Merchant*</label>
      <input id="merchant" name="merchant" type="text" placeholder="Shoes" value="${merchant}"/>
    </div>
    <div class="form-control">
      <label for="total">Total*</label>
      <input id="total" name="total" type="text" placeholder="123.00" value="${total}"/>
      <select name="vault" id="vault">
        <option value="bgn">BGN лв</option>
      </select>
    </div>
    <div class="form-control">
      <label for="category">Category*</label>
      <select name="category" id="category">
        <option disabled ${category ? '' : 'selected'} value="default">Select category...</option>
        ${categoriesOptions}
      </select>
    </div>
    <div class="form-control">
      <label for="description">Description*</label>
      <input id="description" name="description" type="text" placeholder="Shoes description..." value="${description}"/>
    </div>
    <div class="form-control">
      <label for="report">Report: </label>
      <input type="checkbox" name="report" id="report" ${report ? 'checked' : ''}/>
    </div>
    <button type="Submit">Save</button>
  </form>`;
};

const information = ({ data, path }) => {
  const { _id, merchant, total, category, description, report } = data;

  let reportElement = '';
  if (report) {
    reportElement = `<div class="report-action"><a disabled href="/delete/${_id}">Stop tracking</a></div>`;
  }

  return `<section class="expense-report">
    <h1>ID: ${data._id}</h1>
    <div class="report-category">
        <img src="${path}images/amount.png" alt="" />
        <p>${category} - лв ${total.toFixed(2)}</p>
    </div>
    <div class="report-merchant">
        <p>${merchant}</p>
    </div>
    <div class="report-description">
        <img src="${path}images/hastag.png" alt="" />
        <p>${description}</p>
    </div>
    ${reportElement}
  </section>`;
};

const notFound = ({ path }) => {
  return `<img src="${path}images/sadFace.png" alt="sad-face" class="sad-face">
  <h1 class="not-found">404 - Page Not Found</h1>`;
};

const components = { home, login, register, add, information, notFound };

const render = ({ component, user, data, error, path = './' }) => {
  let userMenu = `<li><a class="right-floated" href="/login">Login</a></li>`;
  if (user) {
    userMenu = `<li><a class="right-floated" href="#">${user.username}</a></li><li><a class="right-floated" href="/logout">Logout</a></li>`;
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="${path}css/site.css" />
        <title>Document</title>
      </head>
      <body>
        <header>
          <nav>
            <ul><li><a id="home" class="left-floated" href="/">MoneyGone</a></li></ul>
            <ul>${userMenu}</ul>
          </nav>
        </header>
        <main>
            ${error ? `<section class="notifications"><p class="notification-message">${error}</p></section>` : ''}
            ${component({ user, data, error, path })}
        </main>
        <footer>
          <!-- <a href="#home"> &uarr; Back to top &uarr;</a> -->
          <img src="https://softuni.bg/Content/images/about-page/softuni.png" alt="">
          <p>Software University - JavaScript Back-End September 2019 Season</p>
          <p>@2019 MoneyGone. All Rights Reserved &copy;</p>
        </footer>
      </body>
    </html>`;
};

module.exports = { render, components };
