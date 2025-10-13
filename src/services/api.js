import axios from 'axios';

const api = axios.create({
  // ANTES: baseURL: 'http://localhost:3000/api', 
  // DEPOIS: Acessa a variável VITE_API_URL configurada no Vercel
  // Atenção: O Vercel injeta a variável no objeto import.meta.env
  baseURL: import.meta.env.VITE_API_URL, 
});

export default api;