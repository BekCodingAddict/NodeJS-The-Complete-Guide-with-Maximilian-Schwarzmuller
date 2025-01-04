const express = require("express");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const app = express();

app.engine(
  "hbs",
  engine({
    defaultLayout: "handlebars/layouts",
    extname: "hbs",
  })
);

app.set("view engine", "ejs");
app.set("view engine", "hbs");
app.set("view engine", "pug");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));

///pug routes
app.get("/", (req, res, next) => {
  res.render("index", { pageTitle: "Add User" });
});

app.get("/users", async (req, res, next) => {
  const response = await fetch("http://localhost:9000/usurs").then((resp) => {
    if (!resp.ok) throw new Error("Cant fetch users!");
    return resp.json();
  });

  res.render("users", {
    pageTitle: "Users",
    users: response,
    hasUsers: response.length > 0,
  });
});

app.post("/add-user", (req, res, next) => {
  fetch("http://localhost:9000/usurs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: req.body.userName,
    }),
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then((data) => console.log("Posted data:" + data))
    .catch((error) => console.log("Error:" + error));

  res.redirect("/users");
});

// handlebar routes
app.get("/hbs", (req, res, next) => {
  res.render("index", { pageTitle: "Add User from HBS" });
});

app.get("/users-hbs", async (req, res, next) => {
  const response = await fetch("http://localhost:9000/usurs").then((resp) => {
    if (!resp.ok) throw new Error("Cant fetch users!");
    return resp.json();
  });

  res.render("users", { pageTitle: "Users from hbs", users: response });
});

app.post("/add-user-hbs", (req, res, next) => {
  fetch("http://localhost:9000/usurs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: req.body.userName,
    }),
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then((data) => console.log("Posted data:" + data))
    .catch((error) => console.log("Error:" + error));

  res.redirect("/users-hbs");
});

//ejs routes

app.get("/ejs", (req, res, next) => {
  res.render("index", { pageTitle: "Add User from EJS" });
});

app.get("/users-ejs", async (req, res, next) => {
  const response = await fetch("http://localhost:9000/usurs").then((resp) => {
    if (!resp.ok) throw new Error("Cant fetch users!");
    return resp.json();
  });

  res.render("users", { pageTitle: "Users from EJS", users: response });
});

app.post("/add-user-ejs", (req, res, next) => {
  fetch("http://localhost:9000/usurs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: req.body.userName,
    }),
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then((data) => console.log("Posted data:" + data))
    .catch((error) => console.log("Error:" + error));

  res.redirect("/users-ejs");
});

app.listen(3000, () => console.log("Server running on port :" + 3000));
