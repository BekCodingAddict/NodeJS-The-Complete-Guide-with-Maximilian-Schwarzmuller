const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const clientRoute = require("./routes/client");
const expressHbs = require("express-handlebars");

const app = express();

// app.set("view engine", "pug");
// app.set("views", "views");

app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/handlebars/layouts",
    defaultLayout: "mainLayout",
    extends: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/admin", adminRoutes); //adding filter route
app.use(adminRoutes.routes);
app.use(clientRoute);
app.use((req, res, next) => {
  res.status(404).sendFile(path.resolve(__dirname, "views", "404.html"));
});

app.listen(3000, () => console.log("Server listening on port:" + 3000));
