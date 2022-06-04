import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ViewListIcon from "@mui/icons-material/ViewList";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HomeIcon from '@mui/icons-material/Home';

import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchBar from './searchBar';

const HeaderBar = () => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Button>
                    <ArrowBackIcon/>
                    </Button>
                </Grid>
                <Grid item xs={5}>
                <SearchBar/>
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
            
                
                
                        
        </div>
    )
};

export default HeaderBar;