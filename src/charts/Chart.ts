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

            SVGToPng.convert(svgString, {
                puppeteer : {
                    headless: true,
                    args: ['--no-sandbox','--disable-setuid-sandbox']
                }
            }).then((png)=>{
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
        var keyAndValues = [];
        Object.keys(parameters).forEach(k => {
            keyAndValues.push({key: k, values : parameters[k].split(',')})         
        });

        console.log(JSON.stringify(keyAndValues));

        var data = [];
        
        for(var i=0;i<keyAndValues[0].values.length;i++){
            var currentResult = {};
            for(var j=0;j<keyAndValues.length;j++){
                currentResult[keyAndValues[j].key] = keyAndValues[j].values[i];
            }

            data.push(currentResult);
        }

        return data;
    }
}