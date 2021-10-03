import Transaction from "./Transaction"
import { Hash } from "./types"

export class Block {
    public hash: string
    public previousBlockHash: Hash
    public merkleTreeRoot: Hash
    public time: Date
    public height: number
    public transactions: Transaction[]

    constructor(hash: string, timestamp: number, height: number, prevBlock: Hash, mrklTree: Hash, transactions?: Transaction[]) {
        this.hash = hash
        this.time = new Date(timestamp * 1000)
        this.height = height
        this.previousBlockHash = prevBlock
        this.merkleTreeRoot = mrklTree
        this.transactions = transactions
    }

    static constructFromObj({hash, time, height, prev_block, mrkl_root, tx}: any) {
        const transactions = tx ? tx.map(Transaction.constructFromObj) : []

        return new Block(hash, time, height, prev_block, mrkl_root, transactions)
    }

}