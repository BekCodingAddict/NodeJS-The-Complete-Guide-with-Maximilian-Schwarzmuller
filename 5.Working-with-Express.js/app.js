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
app.use(express.static(path.join(__dirname, "staticFiles")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(adminRoutes);
app.use(clientRoute);

app.listen(3000, () => console.log("Server listening on port:" + 3000));
