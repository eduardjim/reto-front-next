import { fetchProduct } from '../../utils/api';
import ProductDetail from '../../components/ProductDetail'; // Asegúrate de que la ruta sea correcta
import { Product } from '../../types';
import { Button, Container } from '@mui/material';
import Link from 'next/link';

interface ProductDetailPageProps {
  params: {
    sku: string;
  };
}

// Componente de página de detalle del producto
const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  // Directly use params.sku without 'await'
  const { sku } = params;

  let product: Product | null = null;
  let error: string | null = null;

  try {
    product = await fetchProduct(sku);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching product:", err.message);
      error = 'No se pudo cargar el producto.';
    } else {
      console.error("Unknown error:", err);
      error = 'No se pudo cargar el producto.';
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
            <>
              <h1 className='font-bold sans-serif text-center text-8xl'>404</h1>
              <p className='sans-serif text-center text-lg'>El producto que buscas no existe en el catalogo</p>
              <Link href={`/`} style={{ textDecoration: 'none' }} className='mt-5 mr-auto ml-auto block text-center'>
                <Button variant="contained" color="primary" className="mb-16">
                  Volver
                </Button>
              </Link>
            </>
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
