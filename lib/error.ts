export class NotFoundError extends Error {}
export class InvalidInputError extends Error {}

export class NoResponseError extends Error {
    constructor() {
        super("No response from blockchain.info")
    }
}