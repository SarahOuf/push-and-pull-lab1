/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

const postMessage = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200) return response.json();
  return response.json([]);
};

const LongPolling = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    postMessage("http://localhost:3001/messages/longpoll", { message })
      .then(() => setMessage(""))
      .catch((error) => {
        console.log(error);
        setMessage("");
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "http://localhost:3001/messages/subscribe"
      ).then((res) => res.json());
      setMessages(messages.concat(data));
    };
    fetchData();
  }, [messages]);

  return (
    <div className="container">
      <h1 className="text-center">Long Polling</h1>
      <div className="row justify-content-center mt-5">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center mb-3">
            <label htmlFor="message-field" className="col-sm-2 form-label">
              Message:
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                name="message-field"
                id="message-field"
                className="form-control"
                placeholder="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
      <h2 className="text-center fw-bold">Messages</h2>
      <div className="row justify-content-center mt-3">
        <div className="col-md-6">
          <ul>
            {messages.map((m, i) => (
              <li key={i}>{m.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LongPolling;
