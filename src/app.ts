import express from "express";
//todo: add logging https://github.com/expressjs/morgan
const state = {
  deliveryStreams: [{ name: "test", message: [] }],
};
const app = express();
const port = 8080; // default port to listen

app.use(express.json());

// define a route handler for the default home page
app.get("/", (req, res) => {
  // render the index template
  res.send("Hello from express 23");
});

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);
});

app.use((req, res) => {
  console.debug(req.body);
  res.status(200).json({
    DeliveryStreamNames: state.deliveryStreams,
    HasMoreDeliveryStreams: state.deliveryStreams.length > 0,
  });
});

process.on("SIGINT", function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit(0);
});
