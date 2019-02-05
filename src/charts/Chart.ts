export interface Chart{
    style: string;
    getChart(data): string;  
    parseRequest(req): object;  
}