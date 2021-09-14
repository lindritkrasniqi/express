require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: process.env.APP_CLIENT_URL,
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(bodyParser.json({ type: "application/json" }));
app.use(cookieParser());

app.use("/api", require("./routes/api"));

app.all("*", (req, res) => {
  res.status("404").json({ message: "Not found!" });
});

const port = process.env.PORT || 8000;

app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`)
);
