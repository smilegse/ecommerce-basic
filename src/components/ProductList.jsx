import axios from "axios";
import { useState } from "react";
import Helper from "../utility/Helper";
import { useEffect } from "react";
import FullScreenLoader from "./FullScreenLoader";

const ProductList = () => {
    let [data,setData] = useState(null);

    useEffect(()=>{
        (async()=>{
            await callProductList();
        })()
    },[])

    const callProductList = async ()=>{
        let res = await axios.get(`${Helper.API_BASE}/product-list`);
        let productList = res.data['data'];
        setData(productList);

    }

    return (
        <div>
            {data===null?(<FullScreenLoader/>) : (
                <div className="container pt-5">
                    <div className="row">
                        {
                            data.map((item,data)=>{
                                return(
                                    <div className="col-md-3 mt-5">
                                        <div className="card p-3">
                                            <img className="w-100" src={item['image']} alt='card'/>
                                            <h5>Price Tk: 
                                                {item['discount']===0?(<span> {item['price']}</span>):(
                                                    <span> <strike> {item['price']} </strike> {item['discount_price']}</span>
                                                )}
                                            </h5>
                                            <p>{item['title']}</p> 
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;