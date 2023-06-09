const express = require("express");
const database = require("./database/sqlite");

const app = express();
const PORT = 3333;

database();

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));