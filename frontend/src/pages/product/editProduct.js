import React, { useEffect, useState } from 'react';
import './product.css';
import { getCategory, saveProduct } from '../../services/authService';
import { useLocation } from 'react-router-dom';
const EditProduct = () => {
    const [productData, setproductData] = useState();
    const location = useLocation();
    const receivedData = location.state.data;
    console.log(receivedData, "receivedDatareceivedData");

    useEffect(() => {
        setproductData(receivedData)
    }, [])

    const handleChange = (e) => {
        let { name, value } = e.target;
        if(name=="status") value = e.target.value === "true"; // Convert string to boolean
        let newhobby;
        setproductData((prevState) => {
            if (name == "hobby") {

                const hobbies = prevState?.newhobby || [];
                if (!hobbies.includes(value)) {
                    hobbies.push(value);
                    newhobby = hobbies;
                }
                else {
                    newhobby = prevState?.newhobby.filter((arrayvalue) => value !== arrayvalue)
                }
                //console.log(newhobby,"hobbieshobbies"); 
                return {
                    ...prevState, newhobby
                }
            }
            else {
                return {
                    ...prevState, [name]: value
                }
            }

        })
    }
    const saveProduct = async () => {
        try {
            const productdata = await saveProduct(productData);
            alert();
        }
        catch (error) {
            console.log();

        }

    }
    return (
        <>
            {console.log(productData, "categoryDatacategoryDatacategoryData")
            }
            <div className="outer-border">
                <div className="inner-border">

                    <div>
                        <div className="registration">Edit Product</div>
                        <div className="form-contant">
                            <div>
                                <label>Product Name:</label>
                                <input type="text" name="productName" value={productData?.productName || ""} onChange={handleChange} />

                                <label>Product Catgory:</label>
                                <input type="text" name="ProductCategory" value={productData?.ProductCategory || ""} onChange={handleChange} />

                                <label>Sku No:</label>
                                <input type="text" name="skuNo" value={productData?.skuNo || ""} onChange={handleChange} />

                            </div>
                            <div>
                                <label>Product Code:</label>
                                <input type="text" name="ProductCode" value={productData?.ProductCode || ""} onChange={handleChange} />

                                <label>Product Specification:</label>
                                <input type="text" name="ProductSpecification" value={productData?.ProductSpecification || ""} onChange={handleChange} />

                                <label>Product Description:</label>
                                <input type="text" name="productDescription" value={productData?.productDescription || ""} onChange={handleChange} />
                                {/* <label>Hobby</label>
                        Cricket:<input type="checkbox" name="hobby" value={"cricket"} onChange={handleChange} />
                        Song:<input type="checkbox" name="hobby" value={"song"} onChange={handleChange} />
                        Math:<input type="checkbox" name="hobby" value={"math"} onChange={handleChange} /> */}
                            </div>


                        </div>
                        <div className="gender-container">
                            <div>
                                <label htmlFor="html">Status:</label>
                            </div>

                            <div className="radio-btn">
                                <div className="sing">
                                    <input type="radio" id="html" name="status" checked={productData?.status === true} value={true} onChange={handleChange} />
                                    <label htmlFor="html">Active</label>
                                </div>
                                {alert(typeof(productData?.status))}
                                <div className="sing">
                                    <input type="radio" id="css" name="status" checked={productData?.status === false} value={false} onChange={handleChange} />
                                    <label htmlFor="css">Inactive</label>
                                </div>

                            </div>
                        </div>
                        <div className="register-btn">
                            <button className="register-text" onClick={saveProduct}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditProduct;