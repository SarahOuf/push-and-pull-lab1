const cors = require("cors");
const express = require("express");
const messagesRouter = require("./routes/messages");

const app = express();

app.use(cors());
app.use(express.json());
app.use(messagesRouter);

const port = 3001;
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Sever started on port 3001");
});
