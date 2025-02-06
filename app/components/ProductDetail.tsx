import React from 'react';
import { Grid, CardContent, CardMedia, p } from '@mui/material';
import Link from 'next/link';
import {Product} from '@/app/types';
// Define the interface for the product object


interface ProductDetailLayoutProps {
  product: Product;
}

const getSpecifications =(specs:[])=>{
  if(specs.length){
    return (
      <div>
        {specs.map((elem: { name: string, value: string }) => (
          <p key={elem.name}><span className='font-bold sans-serif'>{elem.name}</span>: {elem.value}</p>
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
          <p>
          <span className='font-bold sans-serif'>SKU:</span>  {product.sku}
          </p>
          <p className='font-bold text-[40px] capitalize sans-serif'>
            {product.name}
          </p>
          <p>
          <span className='font-bold text-[30px] sans-serif'>${product.price}</span>
          </p>
          <p className='mb-2'>
          <span className='font-bold sans-serif'>Descripción:</span> {product.description}
          </p>
          <p>
            <span className='font-bold sans-serif'>Categoría:</span> {product.category.name}
          </p>
          <p>
          <span className='font-bold sans-serif'>Marca:</span> {product.brand}
          </p>
          <p>
          <span className='font-bold sans-serif'>Unidades disponibles:</span> {product.stock}
          </p>
          <p>
          <span className='font-bold sans-serif text-[25px]'>Especificaciones:</span>
            {getSpecifications(product.specifications)}
          </p>
          {/* Add specifications list here */}
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default ProductDetailLayout;
