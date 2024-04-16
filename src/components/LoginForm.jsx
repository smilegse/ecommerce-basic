import toast from "react-hot-toast";
import Helper from "../utility/Helper";
import { useState } from "react";
import ButtonSpinner from "./ButtonSpinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    let [submit,setSubmit]=useState(false);
    let navigator = useNavigate();

    const onSubmit = async(e)=>{
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get('email');

        if(Helper.isEmpty(email)){
            toast.error('Email Required!');
        }else{
            setSubmit(true);
            //Api call
            let res =  await axios.post(`${Helper.API_BASE}/user-login`,{UserEmail: email});
            if(res.data['msg'] === 'success'){
                toast.success(res.data['data']);
                sessionStorage.setItem('email', email);
                navigator("/verify")

            }else{
                toast.error('Login Failed');
                setSubmit(false);
            }
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card mt-5 text-center">
                    <div class="card-header">
                        <strong>Login Form</strong>
                    </div>
                        <form onSubmit={onSubmit} className="p-3 text-start">
                            <label>Your Email Address</label>
                            <input type="email" name="email" className="form-control mt-3" />
                            <button disabled={submit} type="submit" className="btn btn-primary form-control mt-3"> { submit ? (<ButtonSpinner/>) :  ("Login") } </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;