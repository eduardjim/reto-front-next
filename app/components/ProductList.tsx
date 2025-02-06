// components/ProductList.tsx
import Link from 'next/link';
import { Product } from '../types'; // Asegúrate de importar el tipo
import { CardMedia, Grid, Card, CardContent, Typography, Button } from '@mui/material';

interface ProductListProps {
  products: Product[]; // Define el tipo de las props
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      {products.length === 0 ? (
        <span>No se encontraron productos.</span>
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.sku}>
              <Card variant="outlined">
                <CardContent>
                  <Link href={`/products/${product.sku}`}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={product.image}
                      alt={product.name}
                      className='mb-10'
                    />
                  </Link>
                  <Typography variant="h6" component="div" className='text-center'>
                  <Link href={`/products/${product.sku}`}>{product.name}</Link>
                  </Typography>
                  <Typography variant="body2" className='text-center'>SKU: {product.sku}</Typography>
                  <Typography variant="body2" className='text-center'>Categoría: {product.category.name}</Typography>
                  <Typography variant="body2" className='text-center'>Marca: {product.brand}</Typography>
                  <Typography variant="h6" color="text.primary" className='text-center font-bold sans-serif'>
                    ${product.price}
                  </Typography>
                  <Link href={`/products/${product.sku}`} style={{ textDecoration: 'none' }} className='mt-1 mb-2 mr-auto ml-auto block text-center'>
                    <Button variant="contained" color="primary" className="bg-indigo-500 shadow-lg shadow-indigo-500/50">
                      Ver Detalle
                    </Button>
                  </Link>
                </CardContent>
                
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ProductList;