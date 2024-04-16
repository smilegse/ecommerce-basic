import axios from "axios";
import { useState } from "react";
import Helper from "../utility/Helper";
import { useEffect } from "react";
import FullScreenLoader from "./FullScreenLoader";
import toast from "react-hot-toast";


const CartList = () => {
    let [data,setData] = useState(null);
    let [loader, setLoader] = useState(false);

    useEffect(()=>{
        (async()=>{
            await callCartList();
        })()
    },[])

    const callCartList = async ()=>{
        try {
            let res = await axios.get(`${Helper.API_BASE}/cart-list`,Helper.tokenHeader());
            let productList = res.data['data'];
            setData(productList);
        } catch (e) {
            Helper.Unauthorized(e.response.status)
        }
    }

    const removeCart = async(id)=>{
        try {
            setLoader(true);
            let res = await axios.get(`${Helper.API_BASE}/remove-cart/${id}`,Helper.tokenHeader());
            debugger;
            setLoader(false);
            //debugger;
            if(res.data['msg'] === 'success'){
                toast.success('Product deleted from Cart');
                await callCartList();
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
            {data === null || loader ? (<FullScreenLoader/>) : (
                <div className="container pt-5">
                    <div className="row">
                        {
                            data.map((item,data)=>{
                                return(
                                    <div key={item['product']['id']} className="col-md-3 mt-5">
                                        <div className="card p-3">
                                            <img className="w-100" src={item['product']['image']} alt='card'/>
                                            <h5>Price Tk: 
                                                {item['product']['discount']=== 0?(<span> {item['product']['price']}</span>):(
                                                    <span> <strike> {item['product']['price']} </strike> {item['product']['discount_price']}</span>
                                                )}
                                            </h5>
                                            <p>{item['product']['title']}</p> 
                                            <button onClick={async()=>{await removeCart(item['product_id'])}} className="btn btn-outline-danger btn-sm">Remove</button>
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

export default CartList;