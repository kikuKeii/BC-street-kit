const app = require("../app/Loader");

exports.index = (req, res) => {
  res.json(
    {
      message: `Welcome to the Bakung Cimentul Kit Express API deploy on Vercel`,
      response: "Success",
      status: 200,
      host: req.hostname,
      environment: app.environment,
      routes: {
        api: {
          index: `/api`,
          users: `/api/users`,
          usersSearch: `/api/users/s?uid=1`,
          author: `/api/author`,
        },
        view: {
          index: `/home`,
        },
      },
    },
    200
  );
};
exports.homePage = (req, res) => {
  // view/pages/home.ejs
  res.render("pages/home", {
    message: `Welcome to the Bakung Cimentul Kit Express API deploy on Vercel`,
    response: "Success",
    status: 200,
    host: req.hostname,
    environment: app.environment,
  });
};
