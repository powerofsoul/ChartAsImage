"use strict";

import * as express from "express";
import { PieChart } from "./charts/PieChart";
import { BarChart } from "./charts/BarChart";
import { StackedBarChart } from "./charts/StackedBarChart";

class Server {

  public app: express;
  public port: number = 3000;

  constructor() {
    this.app = express();
  }

  public start() : void {
    new PieChart().registerRequest(this.app, "/pie");
    new BarChart().registerRequest(this.app, "/bar");
    new StackedBarChart().registerRequest(this.app, "/stackedbar");

    this.app.listen(this.port, () => console.log(`Example app listening on port ${this.port}!`));
  }
}

const server = new Server();

server.start();