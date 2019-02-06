import { Chart } from "./Chart";
import d3NodePie = require('d3node-piechart');

export class PieChart extends Chart{
    constructor(){
        var customStyle = `
        .arc text {
            font: 20px sans-serif;
            fill:white;
            font-weight:bold;
            text-anchor: middle;
        }
        .arc path {
            stroke: #fff;
        }`;
        super(d3NodePie, customStyle);
    }
}