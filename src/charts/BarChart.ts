import d3nBar = require('d3node-barchart');
import { Chart } from './Chart';

export class BarChart extends Chart{
    constructor(){
        var customStyle = `
        .bar{fill: steelblue;}
        .bar:hover{fill: brown;}
        .axis{font: 10px sans-serif;}
        .axis path,.axis line{fill: none;stroke: #000;shape-rendering: crispEdges;}
        .x.axis path{display: none;}`;
        
        super(d3nBar, customStyle);
    };
}