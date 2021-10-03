# Blockinfo

A typescript module for interacting with the blockchain.info.

## Installation

```
npm install blockchainfo
```

## API

### Initialization

```javascript
	const Blockchainfo = require('blockchainfo')
	const client = new Blockchainfo()
```

### Methods

####  getLatestBlock()
Fetches the latest block

```javascript
const latestBlock = client.getLatestBlock()

/*
  Block {
	hash: '0000000000000000000b99a912590820bc610c0c448e7d08bd5076680e171c84',
	time: 2021-10-03T11:44:21.000Z,
	height: 703360,
	previousBlockHash: '0000000000000000000e928aac5b6c2f8906477a9e8cc45a10e93d136288fa41',
	merkleTreeRoot: '04c017abe57e0bcbd482394647709e2a7f72a71dcef9f57c01fee1a09e63bd82',
	transactions: [
	  Transaction {
		hash: '161e42dc4db029ca3b5971fb0268e0f05fbb4e91dc2283b8239c357e565f1086',
		time: 2021-10-03T11:44:21.000Z,
		fee: 0,
		blockHeight: 703360,
		txInputs: [Array],
		txOutputs: [Array]
	  },
	  ...
	]
  }
*/
```

### getBlock(hash: string)
Fetches a block given its block hash

```javascript
const blockHash = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'
const latestBlock = client.getBlock(blockHash)
/*
  Block {
    hash: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
    time: 2009-01-03T18:15:05.000Z,
    height: 0,
    previousBlockHash: '0000000000000000000000000000000000000000000000000000000000000000',
    merkleTreeRoot: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    transactions: [
      Transaction {
        hash: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
        time: 2009-01-03T18:15:05.000Z,
        fee: 0,
        blockHeight: 0,
        txInputs: [Array],
        txOutputs: [Array]
      }
    ]
  }
*/
```

### getBlockByHeight()
Fetches a block given its block height

```javascript
const firstBlock = await client.getBlockByHeight(0)

/*
  Block {
    hash: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
    time: 2009-01-03T18:15:05.000Z,
    height: 0,
    previousBlockHash: '0000000000000000000000000000000000000000000000000000000000000000',
    merkleTreeRoot: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    transactions: [
      Transaction {
        hash: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
        time: 2009-01-03T18:15:05.000Z,
        fee: 0,
        blockHeight: 0,
        txInputs: [Array],
        txOutputs: [Array]
      }
    ]
  }
*/
```

### getTransaction()
Fetches a transaction given its hash

```javascript
const transactionID = 'a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d'
const transaction = await client.getTransaction(transactionID)

/*
  Transaction {
    hash: 'a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d',
    time: 2010-05-22T18:16:31.000Z,
    fee: 99000000,
    blockHeight: 57043,
    txInputs: [
      TransactionInput {
        scriptSig: '493046022100bc57dc26f46fecc1da03272cb2298d8a08b22d865541f5b3a3e862cc87da4b47022100ce1fc72771d164d608b15065832542a0e9040cfdf28862c5175c81fcb0e0b65501410434417dd8d89deaf0f6481c2c160d6de0921624ef7b956f38eef9ed4a64e36877be84b77cdee5a8d92b7d93694f89c3011bf1cbdf4fd7d8ca13b58a7bb4ab0804',
        previousTxOutput: [TransactionOutput],
        witness: undefined
      },
	  ...
    ],
	txOutputs: [
      TransactionOutput {
        amount: 1000000000000,
        scriptPubKey: '76a91446af3fb481837fadbb421727f9959c2d32a3682988ac',
        address: '17SkEw2md5avVNyYgj6RiXuQKNwkXaxFyQ',
        spent: true
      },
	  ...
    ]
  }
*/

```

### getUnconfirmedTransactions
Fetches all unconfirmed transactions

```javascript
const unconfirmedTransactions = await client.getUnconfirmedTransactions()

/*
  [
	Transaction {
	  hash: 'd32a7e1087405bc11f0a952fae6acd0219ea4624868bd20f1af68554e4202ef0',
	  time: 2021-10-03T12:05:16.000Z,
	  fee: 225,
	  blockHeight: null,
	  txInputs: [ [TransactionInput] ],
	  txOutputs: [ [TransactionOutput], [TransactionOutput] ]
	},
	...
  ]
*/
```

### getAddress()
Fetches all details and transactions of a given address

```javascript
const address = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
const getAddress = client.getAddress(address)

/*
  Address {
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    transactionsCount: 3058,
    unredeemedTransactionsCount: 3058,
    balance: 6852268489,
    totalSent: 0,
    totalReceived: 6852268489,
    transactions: [
      Transaction {
        hash: '6457fadd57078fa136658de0608e4ceaaf16f164020587d2b24fbae097773bde',
        time: 2021-10-02T04:56:30.000Z,
        fee: 146,
        blockHeight: 703134,
        txInputs: [Array],
        txOutputs: [Array]
      },
	  ...
    ]
  }
*/
```

### getDifficulty()
Fetches the current difficulty target

```javascript
const difficulty = await client.getDifficulty()
// 18997641161758
```

### getBlockCount
Fetches the current block height in the longest chain

```javascript
const count = await client.getBlockCount()
// 703348
```

## Testing

This module is thoroughly e2e tested with jest.
Run the with using `npm run test'


# Author

Dimitris Lamprinos - [@pkakelas](https://github.com/pkakelas)
