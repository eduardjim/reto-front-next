export interface Product {
    sku: string;
    name: string;
    category: { name: string };
    brand: string;
    price: number;
    specifications: [];
    image: string;
    description: string,
    stock: number
  }