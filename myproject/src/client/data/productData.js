import { mockData } from "./mockData"

const productData = () => {

};

const createData = (merchantCode,productName,productStatus,price,images,brand,reviewDetails,location,badgeDetails) => {
    return {
        "merchantCode" : merchantCode,
        "productName" : productName,
        "productStatus" : productStatus,
        "price" : price,
        "images" : images

}
}