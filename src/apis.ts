import axios from "axios";
import { IValues } from "./Transactions";
import dotenv from 'dotenv'

dotenv.config();

const API_URL =  process.env.REACT_APP_API_URL;
console.log(API_URL)

export function getTransactions() {
    return axios.get(`${API_URL}/transactions`)
}

export function saveTransaction(values: IValues) {
    return axios.post(`${API_URL}/transactions`, values)
}

export function removeTransaction(id: number) {
    return axios.delete(`${API_URL}/transactions/${id}`)
}
