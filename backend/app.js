const express = require("express");
const mongoose = require("mongoose");
const apis = require("./routes/apis");
const dbURI = require("./config").mongoURI;
const app = express();
const port = 3000;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    })
  )
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api", apis);

app.get("/", (req, res) => {
  res.send("Hello world");
});

//error handing middleware
app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});

//access all other paths
app.use((req, res) => {
  res.status(404).send("404: Page not found");
});
