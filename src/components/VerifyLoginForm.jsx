import { useState } from "react";
import ButtonSpinner from "./ButtonSpinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Helper from "../utility/Helper";
import axios from "axios";

const VerifyLoginForm = () => {

    let [submit,setSubmit]=useState(false);
    let navigator = useNavigate();

    const onSubmit = async(e)=>{
        e.preventDefault();
        let formData = new FormData(e.target);
        let otp = formData.get('otp').toString();

        if(Helper.isEmpty(otp)){
            toast.error('Verification Code Required!');
        }else{
            setSubmit(true);
            //Api call
            let email = sessionStorage.getItem('email');
            let res =  await axios.post(`${Helper.API_BASE}/verify-login`,{UserEmail: email, OTP: otp});
            setSubmit(false);
            if(res.data['msg'] === 'success'){
                sessionStorage.setItem("token",res.data['data'])
                window.location.href="/";
            }else{
                toast.error('OTP Verification Failed');
                setSubmit(false);
            }            
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card mt-5 text-center">
                    <div className="card-header">
                        <strong>Verify OTP</strong>
                    </div>
                        <form onSubmit={onSubmit} className="p-3 text-start">
                            <label>Enter OTP</label>
                            <input type="otp" name="otp" className="form-control mt-3" />
                            <button disabled={submit} type="submit" className="btn btn-primary form-control mt-3"> { submit ? (<ButtonSpinner/>) :  ("Verify") } </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyLoginForm;