import { Chart } from "./Chart";
import d3NodePie = require('d3node-piechart');

export class PieChart extends Chart{
    constructor(){
        super(d3NodePie);
    }
}