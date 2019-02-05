import { Chart } from "./Chart";
import d3NodePie = require('d3node-piechart');

export class PieChart implements Chart{
    style: string =`
        .arc text {
            font: 15px sans-serif;
            text-anchor: middle;
        }
        .arc path {
            stroke: #fff;
        }
    `;
    
    public getChart(request): string{
        var data = this.parseRequest(request);
        var pie =  d3NodePie({data: data, style: this.style});

        return pie.svgString();
    }

    parseRequest(req): object {
        var parameters = req.query;

        var labels = parameters['labels'].split(',');
        var values = parameters['values'].split(',');
    
        var data = labels.map((v,i) => {
            return {
                label: v, 
                value: values[i]
            }
        });

        return data;
    }
}