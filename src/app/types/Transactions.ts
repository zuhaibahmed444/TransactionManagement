export interface Transaction {
    id: string;
    date: string;
    comments: string;
    sender: any;
    recipient: any;
    amount:number;
    currencyCd: string;
    status:string;
}