import { Chart } from "./Chart";
import { stackedBarbar } from "./customd3node/d3node-stackedbar";


export class StackedBarChart extends Chart{
    constructor(){
        var customStyle = "";
        super(stackedBarbar, customStyle);
    }
}