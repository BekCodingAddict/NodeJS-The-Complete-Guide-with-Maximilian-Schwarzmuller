const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
// app.use((req, res, next) => {
//   console.log("In the middleware");
//   next(); // Allows the request to continue to the next  in line
// });
app.use(express.static(path.join(__dirname, "staticFiles")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/about", (req, res, next) => {
  //   res.send("<h1 style='color:red;'>Hello from Express</h1>");
  res.sendFile(path.resolve(__dirname, "staticFiles", "about.html"));
});

app.use("/contact", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "staticFiles", "contact.html"));
});
app.post("/send-message", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
  res.send({
    success: true,
    message: "Your message successfully sended!",
  });
});

app.use("/features", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "staticFiles", "features.html"));
});

app.use("/", (req, res, next) => {
  //   res.send("<h1 style='color:red;'>Hello from Express</h1>");
  res.sendFile(path.resolve(__dirname, "staticFiles", "index.html"));
});
app.listen(3000, () => console.log("Server listening on port:" + 3000));
