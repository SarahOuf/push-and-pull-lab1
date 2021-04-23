const express = require("express");

const Router = express.Router();

const messages = [];
const users = {};
const subscribers = {};

// ############ Routes for ShortPolling #############

Router.post("/messages", (req, res) => {
  messages.push(req.body);
  res.status(204).end();
});

Router.get("/messages", (req, res) => {
  const prevDate = req.headers["previous-date"];
  if (prevDate === 0) {
    res.send(messages);
  } else {
    let newMessages = messages.filter((message) => {
      return message.date >= prevDate;
    });

    res.send(newMessages);
  }
});

// ############ Routes for LongPolling #############

Router.get("/messages/subscribe", (req, res) => {
  const id = Math.ceil(Math.random() * 10000);
  subscribers[id] = res;

  req.on("close", () => {
    delete subscribers[id];
  });
});

Router.post("/messages/longpoll", (req, res) => {
  Object.entries(subscribers).forEach(([id, response]) => {
    response.json(req.body);
    delete subscribers[id];
  });
  res.status(204).end();
});

module.exports = Router;
