import { Chart } from "./Chart";
import d3NodePie = require('d3node-piechart');

export class PieChart extends Chart{
    constructor(){
        var customStyle = `
        .arc text {
            font: 10px sans-serif;
            text-anchor: middle;
        }
        .arc path {
            stroke: #fff;
        }`;
        super(d3NodePie, customStyle);
    }
}