const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./servers/routes/userRoute");
require("dotenv").config();

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.static("public"));
app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use("/", userRoutes);
app.listen(port, () => console.log("listening on port " + port));
