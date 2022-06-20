import React, { useState } from 'react';
import AutoComplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


let brandArray =[]
const SearchBar = ({selectedBrand, setSelectedBrand}) => {
    const [searchData, setSearchData] = useState([]);
   
    /* Filtering the brands available in the API response, to provide suggestions for user upon searching */

    const dataFromApi = async () => { 
        let apiUrl = `/backend/search/products?searchTerm=null`;
        if(selectedBrand !== "") {
          apiUrl = `/backend/search/products?searchTerm=${selectedBrand}`;
        }
        try{
          const response = await fetch(apiUrl);
          const modifiedResponse = await response.json();
          modifiedResponse.data.products.forEach(data => {
            if(!brandArray.includes(data.brand)){
                if(data.brand !== "no brand") {
                brandArray.push(data.brand);
                };
            }
            setSearchData(brandArray)
        });
        } catch(error) {
          return Promise.reject(error);
        }
        
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
                if(!brandArray.includes(value || value.toLower() || value.toUpper())){
                brandArray.push(value);
                }
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
