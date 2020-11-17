const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

var routes_api = require("./server_routes/routes_api");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes_api);

app.listen(port, () => console.log(`Listening on port ${port}`));
