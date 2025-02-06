// utils/api.ts
export const fetchProducts = async (searchTerm: string) => {
  console.log('searchTerm',searchTerm)
  const response = await fetch(`https://json-server-test-front-vercel.vercel.app/products?query=${encodeURIComponent(searchTerm)}`);
  // const response = await fetch(`http://localhost:3001/products?query=${encodeURIComponent(searchTerm)}`);
  return response.json();
};

// utils/api.ts
import { Product } from '../types'; // Asegúrate de importar el tipo

export const fetchProduct = async (sku: string): Promise<Product | null> => {
  const response = await fetch(`https://json-server-test-front-vercel.vercel.app/products?sku=${sku}`);
  // const response = await fetch(`http://localhost:3001/products?sku=${sku}`);
  const data: Product[] = await response.json(); // Asegúrate de que TypeScript sepa que es un array de Product

  // Devuelve el primer producto encontrado o null si no hay productos
  return data.length > 0 ? data[0] : null; 
};