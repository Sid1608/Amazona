import Head from 'next/head';
import React from 'react'
import NextLink from 'next/link';
import {AppBar,Toolbar,Typography,Container, Link} from "@mui/material"
import useStyles from "../utils/styles";
const Layout = ({children}) => {
    const classes = useStyles()
  return (
    <div>
      <Head>
        <title>Next Amazona</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>amazona</Typography>
              </Link>
                
            </NextLink>
            <div className={classes.grow}> 

            </div>
            <div>
              <NextLink href="/cart" passHref>
                <Link>Cart</Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
            
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>  
          {children}
      </Container>
      <footer className={classes.footer}> 
          <Typography>
              All rights reserved. Next Amazona
          </Typography>
      </footer>
    </div>
  )
}

export default Layout
