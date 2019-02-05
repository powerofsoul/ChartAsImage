import SVGToPng  = require('convert-svg-to-png')

export class Chart{
    style: string;
    private chartMethod;
    
    protected constructor(chartMethod, style){
        this.chartMethod = chartMethod;
        this.style = style;
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
        var keyLabel = Object.keys(parameters)[0];
        var valueLabel = Object.keys(parameters)[1];

        var labels = parameters[keyLabel].split(',');
        var values = parameters[valueLabel].split(',');
    
        var data = labels.map((v,i) => {
            var obj = {};
            obj[keyLabel] = v;
            obj[valueLabel] = values[i];
            return obj;
        });

        return data;
    }
}