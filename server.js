const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

// ---------------- GET Drivers ----------------
app.get("/drivers", (req, res) => {
  fs.readFile("drivers.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading drivers file");
    res.json(JSON.parse(data));
  });
});

// ---------------- ADD Driver ----------------
app.post("/drivers", (req, res) => {
  fs.readFile("drivers.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading drivers file");

    let drivers = JSON.parse(data).drivers;
    const newDriver = { id: drivers.length + 1, ...req.body };
    drivers.push(newDriver);

    fs.writeFile("drivers.json", JSON.stringify({ drivers }, null, 2), (err) => {
      if (err) return res.status(500).send("Error writing drivers file");
      res.json(newDriver);
    });
  });
});

// ---------------- GET Rentals ----------------
app.get("/rentals", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading rentals file");
    res.json(JSON.parse(data).rentals);
  });
});

// ---------------- GET Grocery ----------------
app.get("/grocery", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading grocery file");
    res.json(JSON.parse(data).grocery);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// ---------------- ADD Booking ----------------++
app.post("/bookings", (req, res) => {
  fs.readFile("bookings.json", "utf8", (err, data) => {
    let bookings = [];
    if (!err) bookings = JSON.parse(data).bookings;

    const newBooking = { id: bookings.length + 1, ...req.body };
    bookings.push(newBooking);

    fs.writeFile("bookings.json", JSON.stringify({ bookings }, null, 2), (err) => {
      if (err) return res.status(500).send("Error writing bookings file");
      res.json(newBooking);
    });
  });
});

// Self Drive Bookings
app.post("/bookings", (req, res) => {
  fs.readFile("bookings.json", "utf8", (err, data) => {
    let bookings = [];
    if (!err) bookings = JSON.parse(data).bookings;

    const newBooking = { id: bookings.length + 1, ...req.body };
    bookings.push(newBooking);

    fs.writeFile("bookings.json", JSON.stringify({ bookings }, null, 2), (err) => {
      if (err) return res.status(500).send("Error writing bookings file");
      res.json(newBooking);
    });
  });
});

// Ride with Driver
app.post("/rides", (req, res) => {
  fs.readFile("rides.json", "utf8", (err, data) => {
    let rides = [];
    if (!err) rides = JSON.parse(data).rides;

    const newRide = { id: rides.length + 1, ...req.body };
    rides.push(newRide);

    fs.writeFile("rides.json", JSON.stringify({ rides }, null, 2), (err) => {
      if (err) return res.status(500).send("Error writing rides file");
      res.json(newRide);
    });
  });
});

// ❌ Remove or comment out GET route
// app.get("/drivers", (req, res) => { ... });

// ✅ Keep only POST route
app.post("/drivers", (req, res) => {
  fs.readFile("drivers.json", "utf8", (err, data) => {
    let drivers = [];
    if (!err) drivers = JSON.parse(data).drivers;

    const newDriver = { id: drivers.length + 1, ...req.body };
    drivers.push(newDriver);

    fs.writeFile("drivers.json", JSON.stringify({ drivers }, null, 2), (err) => {
      if (err) return res.status(500).send("Error writing drivers file");
      res.json({ message: "Driver registered successfully" });
    });
  });
});

