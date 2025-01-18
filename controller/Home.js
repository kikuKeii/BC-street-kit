const app = require("../app/Loader");

exports.index = (req, res) => {
  const { api } = req.query;
  const isShow = (api == 'show') ? true : false;
  if (isShow) {
    return res.json(
      {
        message: `Welcome to the Bakung Cimentul Kit Express API deploy on Vercel`,
        response: "Success",
        status: 200,
        host: req.hostname,
        environment: app.environment,
        routes: {
          api: {
            index: `/?api=show`,
            api: `/api`,
            users: `/api/users`,
            usersSearch: `/api/users/s?uid=:uid`,
            author: `/api/author`,
          },
          view: {
            index: `/`,
          },
        },
      },
      200
    );
  }
  res.render("pages/home", {
    title: "Bakung Cimentul Kit",
    message: "Welcome to the Bakung Cimentul Kit Express API deploy on Vercel",
    about: "BC Street Kit is a minimalist starter kit designed to kickstart projects based on Express.js. This kit provides a basic structure for building applications.",
    environment: app.environment,
  });
};

