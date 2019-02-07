import { Chart } from "./Chart";
import { stackedBar } from "./customd3node/d3node-stackedbar";


export class StackedBarChart extends Chart{
    constructor(){
        var customStyle = "";
        super(stackedBar, customStyle);
    }
}