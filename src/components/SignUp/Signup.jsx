import { useFormik } from 'formik'
import React from 'react'
import myCss from './signup.module.css';
import axios from 'axios';
import $ from 'jquery';
import { useNavigate, Link } from 'react-router-dom';
export default function Signup() {
    const navigate = useNavigate();

    const newUser={
            "name": "",
            "email":"",
            "password":"",
            "rePassword":"",
            "phone":""
    }

    async function sendNewUser(nUser){
        try {
            const {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`, nUser);
            $('.sucMsg').fadeIn(500,function(){
                setTimeout(() => {
                    $('.sucMsg').fadeOut(500,function(){
                        navigate('/login')
                    });
                }, 2000);
            })
        } catch (error) {
            console.log(error);
            $('.errMsg').fadeIn(500,function(){
                setTimeout(() => {
                    $('.errMsg').fadeOut(500);
                }, 2000);
            })
        }
    }
    const formik = useFormik({
        initialValues:newUser,

        onSubmit: function(values){
            console.log(values);
            sendNewUser(values);
        },
        validate:function(values){ 
            let errors = {};
            if(values.name.length < 3 || values.name.length > 20){
              errors.name='name must be more than 3 and less than 15';
            }
            if(values.email.includes('@') == false || values.email.includes('.com') == false ){
              errors.email='email not valid';
            }
            if(! values.phone.match(/^01[0125][0-9]{8}$/) ){
                errors.phone='phone must be Egyption Number';
              }
            if(values.password.length < 3 || values.password.length > 15){
              errors.password='password must be more than 3 and less than 15';
            }
            if(values.password != values.rePassword){
              errors.rePassword='password and rePassword not matched';
            }
            return errors;
          }

        
    })

  return<>
        <div className={myCss.body +' vh-100 d-flex justify-content-center align-items-center'}>
            <div className="container my-5 mx-5">
                <div className="row">
                    <div className="col-lg-12 d-flex flex-wrap justify-content-center align-items-start">
                        <figure style={{height:'100%'}} className={myCss.signupImg +' w-50'}>
                        </figure>
                        <div style={{height:'100%'}} className={myCss.signupCol +' w-50 px-3 py-4'}>
                          <h2 className={myCss.signupH2+' text-center'}>Create My Account!</h2>
                          <div style={{display:'none'}} className="sucMsg text-center alert alert-success py-1">Success</div>
                          <div style={{display:'none'}} className="errMsg text-center alert alert-danger py-1">Email already in use</div>
                          <form onSubmit={formik.handleSubmit}>
                              <input id='name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className='form-control mt-4' placeholder='name' type="text" />
                              {formik.errors.name && formik.touched.name ?<div className="alert py-1 alert-warning">{formik.errors.name}</div>:''}

                              <input id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mt-4' placeholder='email' type="email" />
                              {formik.errors.email && formik.touched.email ?<div className="alert py-1 alert-warning">{formik.errors.email}</div>:''}

                              <input id='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='form-control mt-4' placeholder='phone' type="text" />
                              {formik.errors.phone && formik.touched.phone ?<div className="alert py-1 alert-warning">{formik.errors.phone}</div>:''}

                              <input id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mt-4' placeholder='password' type="password" />
                              {formik.errors.password && formik.touched.name ?<div className="alert py-1 alert-warning">{formik.errors.password}</div>:''}

                              <input id='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className='form-control mt-4' placeholder='rePassword' type="password" />
                              {formik.errors.rePassword && formik.touched.name ?<div className="alert py-1 alert-warning">{formik.errors.rePassword}</div>:''}
                              <button type='submit' className='btn btn-secondary mb-3 w-100 mt-4'>Create Account</button>
                              <p style={{fontSize:'0.9rem'}} className='text-muted'>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</p>
                          </form>
                          <hr />
                          <h6 className='text-center'>Already a member? <Link className='text-decoration-none' to={'/login'}>log in <i className='fa fa-fa-arrow-right'></i> </Link></h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </>
}
