import { useEffect, useState } from "react";
import Helper from './../utility/Helper';
import axios from "axios";

const BadgeCartList = () => {

    let [count,setCount] = useState(0);

    useEffect(()=>{
        (async()=>{
            await callCartList();
        })()
    },[]);

    const callCartList = async ()=>{
        let res = await axios.get(`${Helper.API_BASE}/cart-list`,Helper.tokenHeader());
        let productList = res.data['data'];
        setCount(productList.length);
    }

    return (
        <span class="nav-link-span position-relative"> 
        {
            Helper.isLogin() && count >0 && (
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{count}</span>
            )
        }
        </span>
    );
};

export default BadgeCartList;