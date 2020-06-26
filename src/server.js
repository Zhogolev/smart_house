import express from "express";
import * as si from "systeminformation";
import { Gpio } from "onoff";

const led = new Gpio(2, "out");
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
