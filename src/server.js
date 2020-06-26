const express = require("express");
const si = require("systeminformation");
const Gpio = require("pigpio").Gpio;

const led = new Gpio(2, "out");
const app = express();

let buttonState = false;
let val = 25;

app.get("*", (req, res) => {
  if (val < 250) {
    val += 25;
  } else {
    val = 0;
  }
  console.log("new request", val);
  buttonState = !buttonState;
  si.cpuTemperature((data) => {
    res.send({
      hello: req.query,
    });
    res.end();
  });
  led.write(val);
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
