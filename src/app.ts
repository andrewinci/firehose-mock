import express from "express";
import { firehoseMock } from "./firehoseMock";
//todo: add logging https://github.com/expressjs/morgan
const app = express();
const port = 8080; // default port to listen

// amazon cli uses a custom mime type, here we want to accept anything
// to cover also that case
app.use(express.json({ strict: false, type: "*/*" }));

// return the firehose state to inspect the status
app.get("/", (_req, res) => {
  const streams = Object.entries(firehoseMock.getState().deliveryStreams);
  const page = `
  <h1>Firehose mock</h1>
  <h2>Stream list</h2>
  ${streams.map(
    (v) =>
      `<h3>${v[0]}</h3><p>${v[1].records
        .map((r) => `${r.id} - ${r.content}`)
        .join("</br>")}</p>`
  )}
`;
  res.status(200).send(page);
});

// handle amazon client requests
app.post("/", (req, res) => {
  const target = req.headers["x-amz-target"];
  if (target && typeof target === "string") {
    const response = firehoseMock.handle(target, req.body);
    res.status(response.status).send(response.body);
  } else {
    console.info(
      "Invalid request received. Missing or invalid target ",
      target
    );
    res.sendStatus(400);
  }
});

// start the express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

process.on("SIGINT", function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit(0);
});
