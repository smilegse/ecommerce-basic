import axios from "axios";
import { useState } from "react";
import Helper from "../utility/Helper";
import { useEffect } from "react";
import FullScreenLoader from "./FullScreenLoader";
import toast from "react-hot-toast";

const ProductList = () => {
    let [data,setData] = useState(null);
    let [loader, setLoader] = useState(false);

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

    const addToCart = async(id)=>{
        try {
            setLoader(true);
            let res = await axios.get(`${Helper.API_BASE}/create-cart/${id}`,Helper.tokenHeader());
            setLoader(false);
            //debugger;
            if(res.data['msg'] === 'success'){
                toast.success('Product added to Cart');
            }else{
                toast.error('Request failed!');
            }
        } catch (e) {
            //debugger;
            Helper.Unauthorized(e.response.status)
        }
        

    }

    return (
        <div>
            {data === null || loader?(<FullScreenLoader/>) : (
                <div className="container pt-5">
                    <div className="row">
                        {
                            data.map((item,data)=>{
                                return(
                                    <div key={item['id']} className="col-md-3 mt-5">
                                        <div className="card p-3">
                                            <img className="w-100" src={item['image']} alt='card'/>
                                            <h5>Price Tk: 
                                                {item['discount']===0?(<span> {item['price']}</span>):(
                                                    <span> <strike> {item['price']} </strike> {item['discount_price']}</span>
                                                )}
                                            </h5>
                                            <p>{item['title']}</p> 
                                            <button onClick={async()=>{await addToCart(item['id'])}} className="btn btn-outline-danger btn-sm">Add to Cart</button>
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