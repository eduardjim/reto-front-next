'use client';
import { useEffect, useState } from 'react';
import { fetchProducts } from './utils/api';
import ProductList from './components/ProductList';
import { Product } from './types';
import { Container, TextField } from '@mui/material';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Efecto para cargar productos desde la API cuando cambia el término de búsqueda
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedProducts: Product[] = await fetchProducts(searchTerm);
      if (fetchedProducts) {
        const searchTermLower = searchTerm.toLowerCase();
        // Si searchTerm no está vacío, filtra los productos
        if (searchTerm !== '') {
          const filterProducts = fetchedProducts.filter((prd) => {
            return (
              prd.name.toLowerCase().includes(searchTermLower) ||
              prd.sku.toString().includes(searchTermLower)
            );
          });
          setProducts(filterProducts.length ? filterProducts : []);
        } else {
          // Si searchTerm está vacío, muestra todos los productos
          setProducts(fetchedProducts);
        }
        setLoading(false);
      }      
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="p-4">
      <Container maxWidth="lg" style={{ marginTop: '16px' }}>
        <h1 className="text-3xl font-semibold font-sans text-center uppercase">Resultados de búsqueda</h1>
        <TextField
          label="Buscar productos"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <ProductList products={products} />
        )}
      </Container>
    </div>
  );
};

export default Home;
