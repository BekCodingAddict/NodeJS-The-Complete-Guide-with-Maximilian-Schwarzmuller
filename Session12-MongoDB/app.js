const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorPage = require("./controllers/error");
const dotenv = require("dotenv").config();

// const User = require("./models/user");
// const adminData = require("./routes/admin");
// const shopRoutes = require("./routes/shop");
const { mongoConnect } = require("./util/database");

const app = express();
//express Setting
app.set("view engine", "ejs");
app.set("views", "views");

//express using
app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.log(err));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use("/admin", adminData.routes);
// app.use(shopRoutes);

app.use(errorPage);

mongoConnect(() => {
  app.listen(() => console.log("Server runnig on port :" + 3000), 3000);
});
