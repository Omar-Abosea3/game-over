import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({curUser , clearUserData}) {

    const navigate= useNavigate();

  return <>
      <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary">
          <div className="container-fluid">
              <Link className="navbar-brand me-0 w-25 text-center" to={'/home'}> <img style={{width:'20%'}} className='GameLogo' src={require('../../assets/logo.png')} alt="logo" /> <span>Game Over</span> </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  {curUser? <><ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                          <Link className="nav-link active" to={'/home'} aria-current="page" >Home</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to={'/All'} >All</Link>
                      </li>
                      <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              PlatForm
                          </a>
                          <ul className="dropdown-menu">
                              <li><Link className="dropdown-item link-dark" to={'/platform/pc'} >bc</Link></li>
                              <li><Link className="dropdown-item link-dark" to={'/platform/browser'}>browser</Link></li>
                          </ul>
                      </li>
                      <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              sort-by
                          </a>
                          <ul className="dropdown-menu">
                              <li><Link className="dropdown-item link-dark" to={'/sort-by/release-date'} >release-date</Link></li>
                              <li><Link className="dropdown-item link-dark" to={'/sort-by/popularity'} >popularity</Link></li>
                              <li><Link className="dropdown-item link-dark" to={'/sort-by/alphabetical'}>alphabetical</Link></li>
                              <li><Link className="dropdown-item link-dark" to={'/sort-by/relevance'}>relevance</Link></li>
                          </ul>
                      </li>
                      <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              categories
                          </a>
                          <ul className="dropdown-menu">
                              <li><Link className="dropdown-item link-dark" to={'/categories/racing'} >racing</Link></li>
                              <li><Link className="dropdown-item link-dark" to={'/categories/sports'} >sports</Link></li>
                              <li><Link className="dropdown-item link-dark" to={'/categories/social'}>social</Link></li>
                              <li><Link className="dropdown-item link-dark" to={'/categories/shooter'}>shooter</Link></li>
                              <li><Link className="dropdown-item link-dark" to={'/categories/open-world'} >open-world</Link></li>
                              <li><Link className="dropdown-item link-dark" to={'/categories/zombie'} >zombie</Link></li>
                              <li><Link className="dropdown-item link-dark" to={'/categories/action-rpg'}>action-rpg</Link></li>
                              <li><Link className="dropdown-item link-dark" to={'/categories/action'}>action</Link></li>
                              <li><Link className="dropdown-item link-dark" to={'/categories/flight'} >flight</Link></li>
                              <li><Link className="dropdown-item link-dark" to={'/categories/battle-royal'} >battle-royal</Link></li>
                          </ul>
                      </li>
                  </ul> <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                              <button onClick={function(){clearUserData();navigate('/login')}} className="btn btn-outline-primary">LogOut</button>
                          </li>
                      </ul></> : <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                          <Link className="nav-link active" to={'/login'} aria-current="page" >Login</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link btn btn-outline-info link-info" to={'/signup'} >Join Free</Link>
                      </li>

                  </ul>}
              </div>
          </div>
      </nav>
  </>
}
