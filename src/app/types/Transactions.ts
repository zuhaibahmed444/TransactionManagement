export interface Transaction {
    id: string;
    date: number;
    Comments: string;
    sender: any;
    recipient: any;
    Amount:number;
    CurrencyCd: string;
    status:string;
}