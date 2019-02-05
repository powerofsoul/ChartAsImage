import { Chart } from "./Chart";
import d3NodePie = require('d3node-piechart');
import SVGToPng  = require('convert-svg-to-png')

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
    
    public svgString(request): string{
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

    static registerRequest(expressApp, path): void {
        expressApp.get(path, (req, res) =>{
            res.set('Content-Type', 'image/png');
            const pieChart = new PieChart();
            var svg = pieChart.svgString(req);

            SVGToPng.convert(svg).then((png)=>{
                res.send(png);
            });
        });
    }
}