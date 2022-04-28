import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import Layout from '../../components/Layout';
import data from '../../utils/data';
import NextLink from 'next/link';
import { Button, Card, Grid, Link, List, ListItem, Typography } from '@mui/material';
import useStyles from '../../utils/styles';
import Image from 'next/image';
import db from '../../utils/db';
import {Store} from '../../utils/Store';
import Product from '../../models/Product';
import axios from 'axios';

const ProductScreen = (props) => {
    const router=useRouter();
    const {state,dispatch}=useContext(Store);
    const {product}=props;
    const classes=useStyles();
    // const router=useRouter();
    // const {slug}=router.query;
    // const product=data.products.find(a=>a.slug===slug);
    if(!product){
        return <div>Product Not Found</div>
    }
    const addToCartHandler=async()=>{
        const {data}= await axios.get(`/api/products/${product._id}`);
        if(data.countInStock <=0){
            alert("Sorry. Product is out of stock");
            return;
        }
        dispatch({type:'CART_ADD_ITEM',payload:{...product,quantity:1}})
        router.push('/cart');
    }
  return (
    
    <div>
        <Layout title={product.name} description={product.description}>
            <div className={classes.section}> 
                <NextLink href="/" passHref>
                    <Link><Typography>back to products</Typography></Link>
                </NextLink>
            </div>
            <Grid container spacing={1}> 
                <Grid item md={6} xs={12}>
                    <Image src={product.image} alt={product.name} width={640} height={640} layout="responsive" />
                </Grid>
                <Grid item md={3} xs={12}>
                    <List>
                        <ListItem> 
                            <Typography component="h1" variant="h1">{product.name}</Typography>
                        </ListItem>
                        <ListItem> <Typography>Category: {product.category}</Typography></ListItem>
                        <ListItem> <Typography>Brand: {product.brand}</Typography></ListItem>
                        <ListItem> <Typography>Rating: {product.rating} ({product.numReviews} reviews)</Typography></ListItem>
                        <ListItem> 
                            Description:
                            <Typography>
                                {product.description}
                            </Typography> 

                        </ListItem>
                    </List>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card>
                        <List>
                            <ListItem> 
                                <Grid item xs={6}>
                                    <Typography>
                                        Price
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>
                                        ${product.price}
                                    </Typography>
                                </Grid>
                            </ListItem>
                            <ListItem> 
                                <Grid item xs={6}>
                                    <Typography>
                                        Status
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>
                                        {product.countInStock>0?'In Stock': 'Unavailable'}
                                    </Typography>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button 
                                    fullWidth 
                                    variant="contained" 
                                    color="primary"
                                    onClick={addToCartHandler}
                                >
                                    Add to cart
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
            {/* show information about the product */}
            
        </Layout>
    </div>
  )
}
export async function getServerSideProps(context){
    const {params}=context;
    const {slug}=params;
    await db.connect();
    const product=await Product.findOne({slug}).lean();
    await db.disconnect();
    return {
      props:{
        product:db.convertDocToOb(product),
      }
    }
}
export default ProductScreen;
