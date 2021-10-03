import createRequestInstance from './client'
import { Block } from './Block'
import Transaction from "./Transaction"
import Address from "./Address"
import { Satoshi, Hash } from './types'
import { InvalidInputError } from './error'

export default class {
    private client = createRequestInstance()

    public async getBlock(hash: string): Promise<Block> {
        const res = await this.client.get(`/rawblock/${hash}`)
        return Block.constructFromObj(res)
    }

    public async getLatestBlock(): Promise<Block> {
        const res = await this.client.get('/latestblock')
        return this.getBlock(res['hash'])
    }

    public async getBlockByHeight(height: number): Promise<Block> {
        const res = await this.client.get(`/block-height/${height}?format=json`) 
        if (res['blocks'].length == 0) {
            throw new InvalidInputError('Invalid Block Height')
        }

        return Block.constructFromObj(res['blocks'][0])
    }

    public async getTransaction(hash: string): Promise<Transaction> {
        const res = await this.client.get(`/rawtx/${hash}`)
        return Transaction.constructFromObj(res)
    }

    public async getUnconfirmedTransactions(): Promise<Transaction[]> {
        const res = await this.client.get('/unconfirmed-transactions?format=json')
        return res['txs'].map(Transaction.constructFromObj)
    }

    public async getBalance(address: string): Promise<Satoshi> {
        const res = await this.client.get(`/balance?active=${address}`)
        return res[address].final_balance as Satoshi
    }

    public async getDifficulty(): Promise<number> {
        return this.client('/q/getdifficulty') as any as number
    }

    public async getBlockCount(): Promise<number> {
        return this.client('/q/getblockcount') as any as number
    }

    public async getLatestHash(): Promise<Hash> {
        return this.client('/q/getlatesthash') as any as Hash
    }

    public async getAddressInfo(address: Hash): Promise<any> {
        const res = await this.client(`/rawaddr/${address}`)
        return Address.constructFromObj(res)
    }
}