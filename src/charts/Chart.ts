import SVGToPng  = require('convert-svg-to-png')

export class Chart{
    style: string;
    private chartMethod;
    
    protected constructor(chartMethod){
        this.chartMethod = chartMethod;
    }

    registerRequest(expressApp, path): void {
        expressApp.get(path, (req, res) =>{
            res.set('Content-Type', 'image/png');;
            var svgString = this.svgString(req);

            SVGToPng.convert(svgString).then((png)=>{
                res.send(png);
            });
        });
    }

    public svgString(request): string{
        var data = this.parseRequest(request);
        var pie =  this.chartMethod({data: data, style: this.style});

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