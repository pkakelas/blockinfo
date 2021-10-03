import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import * as CustomErrors from './error'

function getAxiosInstance (): AxiosInstance {
    const instance =  axios.create({
        baseURL: 'https://blockchain.info'
    })
    instance.interceptors.response.use((r: AxiosResponse) => r.data, handleErrors)

    return instance
}

const handleErrors = (error: AxiosError) => {
    const { response } = error

    if (!response) {
        throw new Error("Houston, we have a serious problem")
    }

    switch (response.status) {
        case 404:
            throw new CustomErrors.NotFoundError("Not Found")
        case 400:
            throw new CustomErrors.InvalidInputError("Invalid Input")
    }

    throw error
}

export default getAxiosInstance