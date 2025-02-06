import React from 'react';
import { Grid, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';

// Define the interface for the product object
interface Category {
  name: string;
}

interface Product {
  image: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  specifications: [];
  // You can define more properties here if needed
}

interface ProductDetailLayoutProps {
  product: Product;
}

const getSpecifications =(specs:[])=>{
  if(specs.length){
    return (
      <div>
        {specs.map((elem: { name: string, value: string }) => (
          <p key={elem.name}>{elem.name}: {elem.value}</p>
        ))}
      </div>
    )
    
  }
  return <div></div>
}
const ProductDetailLayout: React.FC<ProductDetailLayoutProps> = ({ product }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <p>
          <Link href={`/`} style={{ textDecoration: 'none' }}>
              Buscador
          </Link> / <span className='font-bold'>{product.name}</span>
        </p>        
      </Grid>
      <Grid item xs={12} sm={6}>
        {product.image && (
          <CardMedia
            component="img"
            height="300"
            image={product.image}
            alt={product.name}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardContent>          
          <Typography variant="body1" color="text.secondary">
            SKU: {product.sku}
          </Typography>
          <Typography variant="h4" component="div" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Precio: ${product.price}
          </Typography>
          
          <Typography variant="body1" color="text.secondary">
            Categoría: {product.category.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Marca: {product.brand}
          </Typography>
          
          <Typography variant="body1" component="div" gutterBottom>
            Especificaciones:
            {getSpecifications(product.specifications)}
          </Typography>
          {/* Add specifications list here */}
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default ProductDetailLayout;
