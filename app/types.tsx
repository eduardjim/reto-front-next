export interface Product {
    sku: string;
    name: string;
    category: Category;
    brand: string;
    price: number;
    specifications: string;
    image: string;
  }
  interface Category {
    name: string;
  }