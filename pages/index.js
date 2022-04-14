import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
// import data from '../utils/data';
import Product from "../models/Product"
import db from '../utils/db'
export default function Home(props) {
  const {products}=props;
  return (
    <Layout>
        <div >
          <h1>Products</h1>
          <Grid container spacing={3}> 

              {products.map((product)=>(
                <Grid item md={4} key={product.name}>
                      <Card>
                        <NextLink href={`/product/${product.slug}`} passHref>
                          <CardActionArea>
                            <CardMedia 
                                Component="img" 
                                image={product.image}
                                title={product.name}
                                ></CardMedia>

                            <CardContent>
                                <Typography>
                                    {product.name}
                                </Typography>

                            </CardContent>
                          </CardActionArea>
                        </NextLink>
                        <CardActions>
                          <Typography>${product.price}</Typography>
                          <Button size="small" color="primary">Add to cart</Button>
                        </CardActions>
                      </Card>
                </Grid>
              ))}

          </Grid>
        </div>
    </Layout>
    
  )
}

export async function getServerSideProps(){
  await db.connect();
  const products=await Product.find({}).lean();
  await db.disconnect();
  return {
    props:{
      products:products.map(db.convertDocToOb),
    }
  }
}
