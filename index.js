const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// const Router = require("named-routes");
// const router = new Router();

// router.extendExpress(app);
// router.registerAppHelpers(app);

app.use(cors());
app.use(bodyParser.json({ type: "application/json" }));

app.use("/api", require("./routes/auth"));

const port = process.env.PROT || 8000;

app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`)
);
