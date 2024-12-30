const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const clientRoute = require("./routes/client");

const app = express();
// app.use((req, res, next) => {
//   console.log("In the middleware");
//   next(); // Allows the request to continue to the next  in line
// });
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/admin", adminRoutes); //adding filter route
app.use(adminRoutes);
app.use(clientRoute);
app.use((req, res, next) => {
  res.status(404).sendFile(path.resolve(__dirname, "views", "404.html"));
});

app.listen(3000, () => console.log("Server listening on port:" + 3000));
