import React, {useState, useEffect} from 'react';
import { Icon } from '@mui/material';
import { Card } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardActions } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ReactPaginate from "react-paginate";
import '../../pagination.css';
import { productApi, productsPerPage } from '../data/constants';
import '../../productCard.css'

const ProductDetailsCard = ({selectedBrand}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    productData();
  }, [selectedBrand]);

  const classes = {
    buttonStyle : {
      color: "white",
      background: "blue"
    },
    content: {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      margin: "10px",
      padding: "10px 0 0",
      boxSizing: "borderBox",
      justifyContent: "space-between",
      flexWrap: "wrap"
    },
    discount : {
      height:"20px",
      width: "20px",
      background: "lightPink",
      color:"red",
      margin: "5px"
    },
    badge: {
    display: "flex",
    height: "inherit",
    width: "inherit"
  },
  ratingIcon: {
    color: "gold"
  },
  cardAction: {
    position: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  };

/* We extract only the required data, that needs to be displayed in the product card from the API response 
and pass the data to get it displayed in the cards*/

  const productData = () => {
    let productDetailsArray = [];
    let filteredArray =[];
    const createData = (id,merchantCode,productName,productStatus,originalPrice,discount,strikeThroughPrice,images,brand,rating,ratingCount,location,badge,badgeLink) => {
        return {
            "id" : id,
            "merchantCode" : merchantCode,
            "productName" : productName,
            "productStatus" : productStatus,
            "OriginalPrice" : originalPrice,
            "discount" : discount,
            "strikeThroughPrice" : strikeThroughPrice,
            "images" : images,
            "brand" : brand,
            "rating" : rating,
            "ratingCount" : ratingCount,
            "location" : location,
            "badge" : badge,
            "badgeLink" : badgeLink
    
    }
    };

const handleProductApi = async() => {
    let apiUrl = `/backend/search/products?searchTerm=null`;
    if(selectedBrand !== "") {
      apiUrl = `/backend/search/products?searchTerm=${selectedBrand}&start=${currentPage}`;
    }
    try{
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data
    } catch(error) {
      return Promise.reject(error);
    }
  };

    const productApiData = async() => {
      let productInfo = [];
      try {
        productInfo = await handleProductApi();
        productInfo.data.products.forEach(data => {
          const extractedData = createData(data.id,data.merchantCode, data.name, data.status, data.price.offerPriceDisplay || "", data.price.discount, data.price.strikeThroughPriceDisplay || "", data.images, data.brand, data.review.rating, data.review.count, data.location, data.badge.merchantBadge, data.badge.merchantBadgeUrl);
        if(!productDetailsArray.includes(extractedData)) {
       productDetailsArray.push(extractedData);
        }
            })
      } catch (error) {
        return Promise.reject(error);
      }
      setData(productDetailsArray);
    };

  productApiData();
}; 

/* Implementing Pagination Logic */

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * productsPerPage;

  /* populating fixed number of cards for the selected page */
  
  const currentPageData = data.slice(offset, offset + productsPerPage).map((data) => 
      <div key={data.id} class ="cardStyle" >
              <Card sx={{ maxWidth: 345 }} raised={true}>
        <CardMedia
          component="img"
          image= {data.images[0]}
          alt="Product Image"
          class="cardImage"
        />
        <CardContent class="cardContent">
          <Typography gutterBottom variant="h6" component="div">
           {data.productName}
          </Typography>
          <Typography color="orange" variant="h8" fontWeight="bold">
            {data.OriginalPrice}
          </Typography>
          <Typography color="text.secondary" variant="h9" fontSize="small">
            <s>{data.strikeThroughPrice}</s>
            {data.discount !== 0 &&
            <Button size="small" style={classes.discount}>{data.discount}%</Button>}
          </Typography>
          <Typography fontSize="small">
            <Icon><img src={data.badgeLink} class="badge"/></Icon>
            {data.location}
          </Typography>
          <Typography>
            {data.rating !== 0 && data.ratingCount !== 0 &&
            <div>
            <StarRoundedIcon style={classes.ratingIcon}/> <span>{data.rating}</span><span>({data.ratingCount})</span>
            </div>}
          </Typography>
        </CardContent>
        <CardActions style={classes.cardAction}>
          <Button style={classes.buttonStyle} size="large">Add To Cart</Button>
        </CardActions>
      </Card>
          </div>
  )

  const pageCount = Math.ceil(data.length / productsPerPage);

    return (
            <div>
        <div class="content">
            {currentPageData}
            </div>
            <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disable"}
            activeClassName={"pagination__link--active"}
            
            />
        </div>

    )
};

export default ProductDetailsCard;
