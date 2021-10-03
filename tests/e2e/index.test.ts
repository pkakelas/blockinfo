import BlockchainClient from '../../lib/index'
import { Block } from '../../lib/Block'

const client = new BlockchainClient()

declare global {
    namespace jest {
        interface Matchers<R> {
            toJSONMatch(instance: Block): R;
        }
    }
}

expect.extend({
    toJSONMatch: (received: Block, instance: Block) => {
        const message = `JSON.stringify of the 2 instances is not the same`
        const pass = JSON.stringify(received) == JSON.stringify(instance)

        return { pass, message: () => message }
    }
})

test('getBalance', async () => {
    const nakamotoAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'

    const balance = await client.getBalance(nakamotoAddress)
    expect(balance).toBe(6852268489)

    expect(client.getBalance('Invalid Address'))
        .rejects.toHaveProperty('message', 'Invalid Input')
})

test('getBlockByHeight', async () => {
    const genesisHeight = 0
    const genesisHash = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'
    const preGenesisHash = '0000000000000000000000000000000000000000000000000000000000000000'
    const nakamotoAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'

    const block = await client.getBlockByHeight(genesisHeight)

    expect(block.height).toBe(genesisHeight)
    expect(block.hash).toBe(genesisHash)
    expect(block.previousBlockHash).toBe(preGenesisHash)

    expect(block.transactions).toHaveLength(1)
    const { txInputs: [txIn], txOutputs: [txOut] } = block.transactions[0]

    expect(txIn.previousTxOutput).toBe(null)
    expect(txOut.address).toEqual(nakamotoAddress)
    expect(txOut.amount).toEqual(5 * 10e8)
    expect(txOut.spent).toBeFalsy()

    expect(client.getBlockByHeight(-1))
        .rejects.toHaveProperty('message', 'Invalid Block Height')
})

test('getBlock', async () => {
    const genesisHash = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'
    const blockByHeight = await client.getBlockByHeight(0)
    const blockByHash = await client.getBlock(genesisHash)

    expect(blockByHash).toJSONMatch(blockByHeight)

    expect(client.getBlock('wrong hash'))
        .rejects.toHaveProperty('message', 'Not Found')
})

test('getLatestBlock', async () => {
    const block = await client.getLatestBlock()
    const properties = Object.getOwnPropertyNames(block)

    expect(block).toBeInstanceOf(Block)

    for (const property of properties) {
        expect(block[property]).toBeDefined()
    }
})

test('getTransaction', async () => {
    const pizzaTransactionID = 'a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d'
    const transaction = await client.getTransaction(pizzaTransactionID)

    expect(transaction.blockHeight).toBe(57043)
    expect(transaction.time.getTime()).toBe((new Date('2010-05-22T18:16:31.000Z')).getTime())
    expect(transaction.txInputs).toHaveLength(131)

    const txOutput = transaction.txOutputs.pop()
    expect(txOutput.amount).toBe(1000000000000)
    expect(txOutput.scriptPubKey).toBe('76a91446af3fb481837fadbb421727f9959c2d32a3682988ac')
    expect(txOutput.address).toBe('17SkEw2md5avVNyYgj6RiXuQKNwkXaxFyQ')
    expect(txOutput.spent).toBe(true)
})

test('getUnconfirmedTransactions', async () => {
    const transactions = await client.getUnconfirmedTransactions()

    expect(transactions).toBeDefined()
    expect(Array.isArray(transactions)).toBe(true)

    for (const transaction of transactions) {
        expect(transaction.blockHeight).toBe(null)
        expect(transaction.time).toBeDefined()
        expect(transaction.fee).toBeDefined()
        expect(Array.isArray(transaction.txInputs)).toBe(true)
        expect(Array.isArray(transaction.txOutputs)).toBe(true)
    }
})

test('getAddress', async () => {
    const nakamotoAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
    const address = await client.getAddress(nakamotoAddress)

    expect(address).toBeDefined()
    expect(address.address).toEqual('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa')

    const properties = Object.getOwnPropertyNames(address)
    for (const property of properties) {
        expect(address[property]).toBeDefined()
    }

    // If it breaks, it's totally worth it
    expect(address.totalSent).toEqual(0)
    expect(address.transactionsCount).toEqual(address.unredeemedTransactionsCount)
    expect(Array.isArray(address.transactions)).toBe(true)

    expect(client.getAddress('Invalid Address'))
        .rejects.toHaveProperty('message', 'Not Found')
})

test('getDifficulty', async () => {
    const difficulty = await client.getDifficulty()
    expect(difficulty).toBeDefined()
    expect(difficulty).toBeGreaterThan(0)
})

test('getBlockCount', async () => {
    const blockCount = await client.getBlockCount()
    expect(blockCount).toBeDefined()

    // Height as of 3/10/21
    expect(blockCount).toBeGreaterThan(703348)
})