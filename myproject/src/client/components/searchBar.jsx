import React, { useState } from 'react';
import AutoComplete from '@mui/material/Autocomplete';
import { InputAdornment, TextField } from '@mui/material';
import { mockData } from '../data/mockData';
import SearchIcon from '@mui/icons-material/Search';

let brandArray =[]
const SearchBar = ({handleClose, handleClick}) => {
    const [searchData, setSearchData] = useState([]);
    const dataFromApi = () => {
        mockData.data.products.forEach(data => {
            if(!brandArray.includes(data.brand)){
                brandArray.push(data.brand);
            }
            setSearchData(brandArray);
            console.log(searchData)
        });
     }
    //dataFromApi();
    //console.log(searchData);
    return (
        <div style = {{marginLeft: "10%"}}>
            <AutoComplete
            style={{width: 200}}
            freeSolo
            autoComplete
            autoHighlight
            options={searchData}
            renderInput = {(params) => (
                <TextField
                {...params}
                onChange = {dataFromApi()}
                variant="outlined"
                // label="Search Box"
                InputProps={{
                    startAdornment: (
                        <InputAdornment>
                        <SearchIcon/>
                        </InputAdornment>
                    )
                }}
                />
    )}
            />
        </div>
    )
};

export default SearchBar;