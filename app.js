const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

const dbURI =
  "mongodb+srv://aneeltripathy56:159632@cluster0.gutfftq.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(3000, () => {
      console.log("listening to port 3000");
    })
  )
  .catch((err) => console.log(err));

app.get("*", checkUser);

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/smoothies", requireAuth, (req, res) => {
  res.render("smoothies");
});

app.use(authRoutes);
