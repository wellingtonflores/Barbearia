import axios from 'axios';

export const endpoints = {
  usuarios: '/usuarios',
};

export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export async function getUsuarios() {
  try {
    const response = await api.get(endpoints.usuarios);
    return response.data;
  } catch (error) {
    console.error('Error fetching usuarios:', error);
    throw error;
  }
}
