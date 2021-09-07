require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json({ type: "application/json" }));

app.use("/api", require("./routes/api"));

app.all("*", (req, res) => {
  res.status("404").json({ message: "Not found!" });
});

const port = process.env.PORT || 8000;

app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`)
);
