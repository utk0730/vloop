const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const apiroutes = require("../server/routes/index");

mongoose
  .connect(
    "mongodb+srv://ub:N7nOFdAMpSND5BdN@cluster0.fqnzs.mongodb.net/vloop?retryWrites=true&w=majority", //TODO : move this to env file
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    console.log("database connected!");
    app.listen(app.get("PORT"), () =>
      console.log("Listening at " + app.get("PORT"))
    );
  })
  .catch((err) => console.log(err));

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", apiroutes);

app.set("PORT", process.env.PORT || 5000);
app.get("/", function (req, res) {
  res.send("Naruto Sever listening");
});
