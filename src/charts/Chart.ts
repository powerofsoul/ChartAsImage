export interface Chart{
    style: string;
    svgString(data): string;  
    parseRequest(req): object;
}