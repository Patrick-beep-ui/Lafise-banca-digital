import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5566", 
});

export const getAccounts = (accountId) => API.get(`/accounts/${accountId}`);
export const getUsers = (userId) => API.get(`/users/${userId}`);
export const getTransactions = (accountId) => API.get(`/accounts/${accountId}/transactions`);
export const createTransaction = (payload) => API.post("/transactions", payload);