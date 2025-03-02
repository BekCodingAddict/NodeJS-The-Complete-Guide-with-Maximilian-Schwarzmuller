const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const errorController = require("./controllers/error");
const User = require("./models/user");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");

const app = express();
const store = new MongoDBStore({
  uri: "mongodb+srv://bekcodingaddict:Otabek97@expressbus.lorhvlo.mongodb.net/Test",
  collection: "sessions", // Rename it to "sessions" (standard convention)
  expires: 1000 * 60 * 60 * 24, // 1 day in milliseconds
});

const csrfProtection = csrf();

store.on("error", function (error) {
  console.log(error);
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection);
app.use(async (req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  await User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => console.log(error));
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://bekcodingaddict:Otabek97@expressbus.lorhvlo.mongodb.net/Test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(async () => {
    console.log("Connected to MongoDB ✅");
    app.listen(3000, () => console.log("Server is running on port 3000 🚀"));
  })
  .catch((err) => console.log("MongoDB connection error:", err));
