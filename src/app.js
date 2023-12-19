const dotenv = require("dotenv");
const connectToDatabase = require("./database/mongodb");
const express = require("express");
const path = require("path");
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const publicUserRoutes = require("./routes/public/publicUserRoutes");
const publicEcoPointRoutes = require("./routes/public/publicEcoPointRoutes");
const privateUserRoutes = require("./routes/private/privateUserRoutes");
const privateEcoPointRoutes = require("./routes/private/privateEcoPointRoutes");

dotenv.config();
connectToDatabase();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(publicUserRoutes);
app.use(publicEcoPointRoutes);
app.use(privateUserRoutes);
app.use(privateEcoPointRoutes);

// Express Deployment 
// app.listen(process.env.EXPRESS_PORT, () => console.log(`Running at: ${process.env.EXPRESS_HOST}`));

// Express Local
app.listen(process.env.EXPRESS_PORT, () => console.log(`Running at: http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`));

module.exports = app;
