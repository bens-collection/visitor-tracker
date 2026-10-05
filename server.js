const express = require("express");

const app = express();
app.use(express.json());

const visits = [];

app.get("/", (req, res) => {
  res.send("Ben's Visitor Tracker is running.");
});

app.post("/track", (req, res) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket.remoteAddress;

  const visit = {
    ip: ip,
    time: new Date().toISOString(),
    userAgent: req.headers["user-agent"] || "Unknown"
  };

  visits.push(visit);

  console.log("NEW VISITOR:", visit);

  res.json({ success: true });
});

app.get("/visits", (req, res) => {
  res.json(visits);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Tracker running on port ${PORT}`);
});
