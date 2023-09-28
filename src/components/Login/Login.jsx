import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import myCss from '../SignUp/signup.module.css'
import axios from 'axios';
export default function Login({getUserData}) {
    const navigate = useNavigate();
    
    function afterLogin(){
        getUserData();
        navigate('/home');
    }
    const loginUser={
            "email":"",
            "password":"",
    }

    function loadingImog(){
        $('.loginBtn').html(`<i class='fa fa-spinner fa-spin text-black'></i>`);
    }

    async function sendNewUser(nUser){
        try {
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, nUser);
                if(data.message == 'success'){
                    localStorage.setItem('tkn',data.token);
                    setTimeout(() => {
                        $('.loginBtn').html('Login');
                        afterLogin();
                    }, 2000);
                }
            
        } catch (error) {
            console.log(error);
            $('.loginBtn').html('Login');
            $('.errMsg').fadeIn(500,function(){
                setTimeout(() => {
                    $('.errMsg').fadeOut(500);
                }, 2000);
            })
        }
    }
    const formik = useFormik({
        initialValues:loginUser,

        onSubmit: function(values){
            console.log(values);
            sendNewUser(values);
        },

    })

  return<>
        <div className={myCss.body +' vh-100 d-flex justify-content-center align-items-center'}>
            <div className="container my-5 mx-5">
                <div className="row">
                    <div className="col-lg-12 d-flex flex-wrap justify-content-center align-items-start">
                        <figure style={{height:'100%'}} className={myCss.signupImg +' w-50'}>
                        </figure>
                        <div style={{height:'100%'}} className={myCss.signupCol +' w-50 px-3 text-center py-4'}>
                          <img src={require('../../assets/logo.png')} alt="logo" className='w-25' />
                          <h2 className={myCss.signupH2+' text-center'}>Log in to GameOver</h2>
                          <div style={{display:'none'}} className="errMsg text-center alert alert-danger py-1">Email or Password is not correct.</div>
                          <form onSubmit={formik.handleSubmit}>
                              <input id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mt-4' placeholder='email' type="email" />
                              
                              <input id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mt-4' placeholder='password' type="password" />

                              <button onClick={loadingImog} type='submit' className='btn loginBtn btn-secondary w-100 mt-4'>Login</button>
                          </form>
                          <hr />
                          <h6 style={{cursor:'pointer'}} className='text-primary' onClick={function(){alert('اعمل اكونت جديد ياصاحبي')}}>Forget Password</h6>
                          <h6>Not a member yet? <Link className='text-decoration-none' to={'/signup'}>Create Account</Link></h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </>
}
