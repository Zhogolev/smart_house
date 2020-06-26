const express = require("express");
const si = require("systeminformation");
const Gpio = require("onoff").Gpio;

const led = new Gpio(2, "out");
const app = express();

let buttonState = false;

app.get("*", (req, res) => {
  console.log('new request');
  buttonState = !buttonState;
  si.cpuTemperature((data) => {
    res.send({
      hello: req.query,
    });
    res.end();
  });
  led.write(buttonState ? Gpio.HIGH : Gpio.Low);
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
