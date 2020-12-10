const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const morgan = require('morgan');
const fs = require("fs");

require("dotenv").config();
require("./database/connect");

app.use(cors());
const port = process.env.PORT || 3000;
const host = process.env.HOST;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const user = require("./routes/user");
const admin = require("./routes/admin");

app.use(morgan('dev'));

app.use("/api/user", user.routes);
app.use("/api/admin", admin.routes);

app.use('/assets', express.static('assets'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, host, () => {
    console.log("Your Server running at http://" + host + ":" + port);
});