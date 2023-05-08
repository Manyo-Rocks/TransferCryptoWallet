const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0379e856bcb4d3692d9383c8a146a27f4e28f8e12738c685926f3f48a10a73f255": 100,//3920ec4dfd09a0384c3016b3068491ba2ec4f5168486262dfdd04364037fb5ab
  "03d8a486074eaab4ea61b8068c8836a87672e73cea453a04530e1510a09ada3efb": 50, // a37fe3fd850fbf8f8c6b853a37b49b4483a86bf5e4cec814c5946448a9664c7b
  "02119e43e841a54200b12e8c4aed58514c933707df700d67258a8816d39bd8de52": 75, //
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
