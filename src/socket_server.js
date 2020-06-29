const WebSocket = require("ws");
const Gpio = require("pigpio").Gpio;
const led_1_gpio = new Gpio(2, { mode: Gpio.OUTPUT });
led_1_gpio.pwmFrequency(488);
const port = process.env.PORT || 8082;

let server = new WebSocket.Server({
  port: port,
});

let led1 = 0;

const EVENT_SEND_LED_1 = "led_1";

const SET_LED_1_MESSAGE = "set_led_1";

server.on("connection", (client) => {
  client.send(prepareMessage(EVENT_SEND_LED_1, led1));
  client.on("message", (event) => {
    const jsEvent = JSON.parse(event);
    if (jsEvent["message"] == SET_LED_1_MESSAGE) {
      led1 = jsEvent["value"];
      led1 = led1 == null ? 0 : led1;
      server.clients.forEach((client) =>
        client.send(prepareMessage(EVENT_SEND_LED_1, led1))
      );
      led_1_gpio.pwmWrite(led1);
    }
  });
});

const prepareMessage = (message, value) => JSON.stringify({ message, value });
