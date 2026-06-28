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

// ---------------- BOOKING FORM ----------------
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = bookingForm.querySelectorAll("input");
    const bookingData = {
      name: inputs[0].value,
      phone: inputs[1].value,
      license: inputs[2].value,
      aadhaar: inputs[3].value,
      date: inputs[4].value,
      vehicle: new URLSearchParams(window.location.search).get("vehicle")
    };

    fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    })
      .then(res => res.json())
      .then(() => {
        alert("✅ Booking confirmed for " + bookingData.vehicle);
        window.location.href = "index.html";
      });
  });
}

// Self Drive Booking
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = bookingForm.querySelectorAll("input, select");
    const bookingData = {
      name: inputs[0].value,
      phone: inputs[1].value,
      license: inputs[2].value,
      aadhaar: inputs[3].value,
      date: inputs[4].value,
      vehicle: inputs[5].value
    };

    fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    })
      .then(res => res.json())
      .then(() => {
        alert("✅ Self Drive Booking confirmed for " + bookingData.vehicle);
        window.location.href = "index.html";
      });
  });
}
