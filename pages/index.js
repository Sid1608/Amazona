import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import {useRouter} from 'next/router';
// import data from '../utils/data';
import Product from "../models/Product"
import db from '../utils/db'
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../utils/Store';
export default function Home(props) {
  const router=useRouter();
  const {state,dispatch}=useContext(Store);
  const {products}=props;
  const addToCartHandler=async(product)=>{
    const {data}= await axios.get(`/api/products/${product._id}`);
    // if(data.countInStock <=0){
    //     window.alert("Sorry. Product is out of stock");
    //     return;
    // }
    const existItem=state.cart.cartItems.find(x=>x._id===product._id);
    const quantity=existItem?existItem.quantity+1:1;
    if(data.countInStock <quantity){
      window.alert("Sorry. Product is out of stock");
      return;
  }
    dispatch({type:'CART_ADD_ITEM',payload:{...product,quantity}})
    router.push('/cart');
}
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
                          <Button 
                            size="small" 
                            color="primary" 
                            onClick={()=>addToCartHandler(product)}
                          >
                              Add to cart
                          </Button>
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
