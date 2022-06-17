import React, { useState } from 'react';
import AutoComplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { mockData } from '../data/mockData';
import SearchIcon from '@mui/icons-material/Search';


let brandArray =[]
const SearchBar = ({selectedBrand, setSelectedBrand}) => {
    const [searchData, setSearchData] = useState([]);
   
    /* Filtering the brands available in the API response, to provide suggestions for user upon searching */

    const dataFromApi = () => { mockData.data.products.forEach(data => {
            if(!brandArray.includes(data.brand)){
                brandArray.push(data.brand);
            }
            setSearchData(brandArray)
        });
    };

    return (
        
        <div>
            <SearchIcon/>
            <AutoComplete
            style={{width: 200, display: "inline-grid"}}
            freeSolo
            autoComplete
            autoHighlight
            options={searchData}
            value={selectedBrand}
            onChange = {(event, value) => {
                if(value){
                setSelectedBrand(value);
                } else {
                    setSelectedBrand("");
                }
            }}
            renderInput = {(params) => (
                <TextField
                {...params}
                onChange = {dataFromApi()}
                variant="outlined"
                />
    )}
            />
        </div>

    )
};

export default SearchBar;
