const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("67b4cef85b426d77532bb2d0");
    if (user) req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
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
    let user = await User.findOne();
    if (!user) {
      user = new User({
        name: "John",
        email: "John@text.com",
        cart: { items: [] },
      });
      await user.save();
    }
    console.log("Connected to MongoDB ✅");
    app.listen(3000, () => console.log("Server is running on port 3000 🚀"));
  })
  .catch((err) => console.log("MongoDB connection error:", err));
