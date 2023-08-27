const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
require("./db/db");
const userRegister = require("./models/register");
const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();
const userRoute = require("./routes/userRoute");

app.use(
  cors({
    origin: [process.env.FE_URL],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended: false}));
app.use("/api/user/", userRoute);

app.get("/", (req, res) => {
  res.send("server sucessfully running!");
});

app.use(express.static(path.join(__dirname, "./screen-recorder/public")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./screen-recorder/public/index.html"));
});


app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
