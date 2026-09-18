import React from 'react'
import { useEffect, useState } from 'react';
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import axios from 'axios';


const Verify = () => {


    const [searchparams]=useSearchParams();
    const [error, setError] = useState('');
    const success=searchparams.get("success")
    const orderId=searchparams.get("orderId")
    const navigate=useNavigate();

    const {url} = useContext(StoreContext)    
    useEffect(()=>{
        let active = true;
        const verifypayment = async () => {
            try {
                const response = await axios.post(url+"/api/order/verify",{success,orderId});
                if (active) {
                    navigate(response.data.success ? "/myorders" : "/", { replace: true });
                }
            } catch {
                if (active) {
                    setError('Unable to verify your payment. Please refresh to try again.');
                }
            }
        };
        verifypayment();
        return () => { active = false; };
    },[url, success, orderId, navigate])
    return (
        <div className='verify'>
            {error ? <p role="alert">{error}</p> : <div className='spinner'></div>}
        </div>
    )
}

export default Verify;
