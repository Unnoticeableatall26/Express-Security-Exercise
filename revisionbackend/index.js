const express = require("express");
const app = express();
const port = 3000;

app.use((req, res, next) => {
  const date = new Date().toISOString();
  console.log("Date :", date);
  console.log("Headers :", req.headers);
  next();
});

app.get("/data", (req, res) => {
  res.json({ data: [1, 2, 3] });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// pour le json-server
app.use(express.json());

app.post("/multiplyBy2", (req, res) => {
  const { input } = req.body;
  const result = input * 2;
  res.json({ result });
});