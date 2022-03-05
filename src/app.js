const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const DotEnv = require("dotenv");
const AppRoutes = require("./routes/AppRoutes");

DotEnv.config();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use("/images", express.static("images"));
app.use("/api", AppRoutes);

app.get("/", (req, res) => {
    res.send("Welcome");
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
