"use client"
import React ,{useEffect, useState}from 'react';
import { fetchProduct } from '../../utils/api';
import ProductDetail from '../../components/ProductDetail'; // Asegúrate de que la ruta sea correcta
import { Product } from '../../types';
import { Button, Container } from '@mui/material';
import Link from 'next/link';
import { useParams } from "next/navigation";

// Componente de página de detalle del producto

const ProductDetailPage = () => {
  // Directly use params.sku without 'await'
  const params = useParams();
  const sku = params?.sku as string;
  const [product,setProduct] = useState<Product | null>(null);
  const [loading,setLoading] = useState<boolean|null>(true);
  const [error,setError] = useState<string | null>(null);

  useEffect(()=>{
    getInfo()
  },[])
  
const getInfo = async()=>{
  try {
    const productresponse = await fetchProduct(sku);
    setProduct(productresponse);
    setLoading(false);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching product:", err.message);
      setError('No se pudo cargar el producto.')
    } else {
      console.error("Unknown error:", err);
      setError('No se pudo cargar el producto.')
    }
  }
}
  return (
    <>
      {!error ? (
        <>
          {product ? (
            <Container maxWidth="lg" style={{ marginTop: '16px' }}>
              <ProductDetail product={product} />
            </Container>
          ) : (
            loading?(<h1 className='font-bold sans-serif text-center text-lg'>Cargando...</h1>):(
              <>
              <h1 className='font-bold sans-serif text-center text-8xl'>404</h1>
              <p className='sans-serif text-center text-lg'>El producto que buscas no existe en el catalogo</p>
              <Link href={`/`} style={{ textDecoration: 'none' }} className='mt-5 mr-auto ml-auto block text-center'>
                <Button variant="contained" color="primary" className="mb-16">
                  Volver
                </Button>
              </Link>
            </>
            )
            
          )}
        </>
      ) : (
        <>
          <h1 className='font-bold sans-serif text-center text-8xl'>500</h1>
          <p className='sans-serif text-center text-lg'>Error al consultar en el servidor</p>
          <Link href={`/`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" className="mb-16 text-center">
              Volver
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

export default ProductDetailPage;
