import React, { useEffect,useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getProduct } from "../../services/productService";
const ProductList = () => {
  const [listData,setListData] =useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getProductList = async() => {
      try{
        const productData= await getProduct();
        if(productData?.status=="success")
        {
          console.log(productData?.data?.productList,"??????????????????????");
          setListData(productData?.data?.productList)
        }
      }catch(error){
        console.log(error,"error");
      }
    }
    getProductList();
  }
  , [])
  const handleRedirect=(e,item)=>{
    navigate("/edit-prdouct",{state:{data:item}})
  }
  return (
    <>
      <div class="main">
        <div class="heading-part">
          <div>
            <h5 class="heading-text">Manage-Product</h5>
          </div>
          <div class="action-btn">
            {/* <button class="del-text"><img src="./public/images/minus.png" class="icon"/> Delete</button> */}
            <button class="add-text"><Link to="/product" className="link"><FontAwesomeIcon icon={faPlus} size="1x" color="white" /> Add New Category</Link></button>
          </div>

        </div>
        <div class="table-part">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>Product Name</th>
                  <th>Product category</th>
                  <th>product price</th>
                  <th>product description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {
                console.log(listData,"listData")
                
              }
              <tbody id="table-body">
              {listData && listData.map((item,key)=>{
                return(
                  <tr key={key}>
                  <td><input type="checkbox"/></td>
                  <td>{item?.productName}</td>
                  <td>{item?.ProductCatgory}</td>
                  <td>{item?.productName}</td>
                  <td>{item?.productName}</td>
                  <td class="actions">
                    <span class="edit" onClick={(e)=>{handleRedirect(e,item)}}>✏️</span>
                    <span class="delete" onclick={item?._id}>🗑️</span>
                  </td>
                </tr>
                )
              })}
                
               
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  )
}
export default ProductList;