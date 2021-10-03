import { Satoshi, Script, Hash } from "./types";

export default class Transaction {
    public hash: Hash
    public fee: Satoshi
    public time: Date
    public blockHeight: number
    public txInputs: TransactionInput[]
    public txOutputs: TransactionOutput[]

    constructor(hash: Hash, time: Satoshi, fee: Satoshi, height: number,
        txInputs?: TransactionInput[],
        txOutputs?: TransactionOutput[]
    ) {
        this.hash = hash
        this.time = new Date(time * 1000)
        this.fee = fee
        this.blockHeight = height 
        this.txInputs = txInputs
        this.txOutputs = txOutputs
    }

    public static constructFromObj({hash, time, fee, block_height, inputs, out}: any): Transaction {
        const txInputs = inputs.map(TransactionInput.constructFromObj)
        const txOutputs = out.map(TransactionOutput.constructFromObj)

        return new Transaction(hash, time, fee, block_height, txInputs, txOutputs)
    }
}

export class TransactionInput {
    public previousTxOutput: TransactionOutput
    public scriptSig: Script
    public witness?: Hash

    constructor(scriptSig: Script, prevTxOut?: TransactionOutput, witness?: Hash) {
        this.scriptSig = scriptSig
        this.previousTxOutput = prevTxOut
        this.witness = witness
    }

    public static constructFromObj({script, prev_out, witness}): TransactionInput {
        return prev_out ? 
            new TransactionInput(script, TransactionOutput.constructFromObj(prev_out)) : 
            new TransactionInput(script, null, witness)
    }
}

export class TransactionOutput {
    address: Hash
    amount: Satoshi
    scriptPubKey: Script
    spent: boolean

    constructor(amount: Satoshi, scriptPubKey: Script, address: Hash, spent: boolean) {
        this.amount = amount
        this.scriptPubKey = scriptPubKey
        this.address = address
        this.spent = spent
    }

    public static constructFromObj({ value, script, addr, spent }): TransactionOutput {
        return new TransactionOutput(value, script, addr, spent)
    }
}
