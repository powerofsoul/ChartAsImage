"use strict";

import * as express from "express";
import { PieChart } from "./charts/PieChart";

class Server {

  public app: express;
  public port: number = 3000;

  constructor() {
    this.app = express();
  }

  public start() : void {
    this.app.get('/pie', (req, res) =>{
        const pieChart = new PieChart();
        res.send(pieChart.getChart(req));
    });

    this.app.listen(this.port, () => console.log(`Example app listening on port ${this.port}!`));
  }
}

const server = new Server();

server.start();