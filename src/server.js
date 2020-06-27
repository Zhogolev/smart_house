const express = require("express");
const si = require("systeminformation");
const Gpio = require("pigpio").Gpio;

const led = new Gpio(2, {mode: Gpio.OUTPUT});
const app = express();


const integersOnlyRegExp = /^\d+$/;

let buttonState = false;

app.get("/led", (req, res) => {

  console.log(req.query);

  let val = req.query['led_value'];
  if(!integersOnlyRegExp.test(val)){
    return res.end('cant_get_led_value');
  };

  if(val == null){
    val = 0;
  } else if(val > 255){
    val = 255;
  }

  console.log("new request", val);
  buttonState = !buttonState;
  si.cpuTemperature((data) => {
    res.send({
      hello: data,
    });
    res.end();
  });
  led.pwmWrite(val);
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
