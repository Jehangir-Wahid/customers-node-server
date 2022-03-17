require("./models/Customer");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const DotEnv = require("dotenv");
const AppRoutes = require("./routes/AppRoutes");
const mongoose = require("mongoose");

DotEnv.config();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use("/images", express.static("images"));
app.use("/api", AppRoutes);

const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(`${connectionString}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("connected to mongodb instance");
});

mongoose.connection.on("error", (err) => {
    console.log("Error connecting to mongo");
});

app.get("/", (req, res) => {
    res.send("Welcome");
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
