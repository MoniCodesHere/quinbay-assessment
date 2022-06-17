import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ViewListIcon from "@mui/icons-material/ViewList";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchBar from './searchBar';
import ProductDetailsCard from './productDetailsCard';
import EmailIcon from '@mui/icons-material/Email'

const classes = {
    container : {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      padding: "30px 50px 20px 50px",
      boxSizing: "borderBox" 
    },
    email: {
        color : "blue"
    }
  };

const PageContent = () => {
    
/* Using useState() hook to set and retrive the user entered brand from search bar, 
we pass this as props to the Search Bar and productDetails card components*/

    const [selectedBrand, setSelectedBrand] = React.useState("");

/* The content to be rendered on the homePage - includes header with 
icons and search bar and the product cards to be displayed 
based on the search input (brand name) */ 

        return (
        <div>
            <header style={{marginTop: "20px"}}>
            <Grid container>
                <Grid item xs={4}>
                    <Button>
                    <ArrowBackIcon/>
                    </Button>
                </Grid>
                <Grid item xs={5}>
                <SearchBar selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand}/>
                </Grid>
                <Grid item xs={1}>
                <Button>
                    <ViewListIcon/>
                    </Button>
                </Grid>
                <Grid item xs={1}>
                <Button>
                    <ShoppingBagIcon/>
                    </Button>
                </Grid>
                <Grid item xs={1}>
                <Button>
                    <HomeIcon/>
                    </Button>
                </Grid>
            </Grid>
            </header>
            <div style={classes.container}> 
                <ProductDetailsCard selectedBrand={selectedBrand}/>
                <footer> 
                    Feel free to write to us !... <br/>
                    <div style={classes.email}><EmailIcon/> feedbacks@qb.com </div>
                </footer>
            </div>                    
        </div>
    )
};

export default PageContent;
