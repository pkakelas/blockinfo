import Transaction from "./Transaction"
import { Hash } from "./types"

export default class Address {
    public address: Hash
    public transactionsCount: number
    public unredeemedTransactionsCount: number
    public balance: number
	public totalSent: number
	public totalReceived: number
    public transactions: Transaction[]

    constructor(address: Hash, txCount: number, unredeemedTxCount: number, balance: number,
			    totalSent: number, totalReceived: number, transactions?: Transaction[]) {

        this.address = address
        this.transactionsCount = txCount
        this.unredeemedTransactionsCount = unredeemedTxCount
        this.balance = balance
        this.totalSent = totalSent
        this.totalReceived = totalReceived
        this.transactions = transactions
    }

    static constructFromObj({address, n_tx, n_unredeemed, total_received, total_sent, final_balance, txs}: any) {
        const transactions = txs ? txs.map(Transaction.constructFromObj) : []

        return new Address(address, n_tx, n_unredeemed, final_balance, total_sent, total_received, transactions)
    }
}