import Head from 'next/head';
import React from 'react'
import {AppBar,Toolbar,Typography,Container} from "@mui/material"
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
            <Typography>amazona</Typography>
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
