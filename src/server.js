const express = require("express");
const si = require("systeminformation");
const GpioLib = require("onoff");

const led = new GpioLib.Gpio(2, "out");
const app = express();

let buttonState = false;

app.get("*", (req, res) => {
  buttonState = !buttonState;
  led.writeSync(buttonState ? Gpio.HIGH : Gpio.Low);
  si.cpuTemperature((data) => {
    res.send({
      hello: req.query,
    });
    res.end();
  });
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
