import axios from "axios";

const api = axios.create({
  baseURL: "https://68615fa48e7486408445c9be.mockapi.io", // base da sua API
});

// Buscar todos os produtos
export const getProdutos = () => api.get("/produtos");

// Buscar produto por ID
export const getProdutoById = (id) => api.get(`/produtos/${id}`);

// Criar novo produto
export const createProduto = (data) => api.post("/produtos", data);

// Atualizar produto
export const updateProduto = (id, data) => api.put(`/produtos/${id}`, data);

// Deletar produto
export const deleteProduto = (id) => api.delete(`/produtos/${id}`);

