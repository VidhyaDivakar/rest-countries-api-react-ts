//custom error for request/Network related failures
export class NetworkError extends Error {
     constructor(message : string) {
        super(message);
        this.name = "NetworkError";
     }
}
// custom error for invalid or missing data 
export class DataError extends Error {
    constructor(message : string) {
        super(message);
        this.name = "DataError";
    }
}