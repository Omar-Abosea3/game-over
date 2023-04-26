import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import gameCss from './gameDetailes.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LodingScrean from '../loadingScreen/LodingScrean';

export default function GameDetailes() {

    const {id} = useParams();
    console.log(id);

    const [GameDetailes, setGameDetailes] = useState(null);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows : false,
      };

      async function getAllGameDetailes(){
        try {
            const {data} = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/game',{
                params: {id: id},
                headers: {
                  'X-RapidAPI-Key': '0a9f769d69msh9c403cce9468d75p14656fjsn411835be2e8e',
                  'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            })
            setGameDetailes(data);
            console.log(data);
            
        } catch (error) {
            console.log(error);
        }
      }

      useEffect(function(){
        getAllGameDetailes();
      },[]);

  return<>
        {GameDetailes == null?<LodingScrean/>:<section id={gameCss.GameDet} style={{backgroundImage:`url(https://www.freetogame.com/g/${GameDetailes.id}/background.jpg)`}}>
          <div className={gameCss.layer + " py-5"}>
              <div className="container py-5">
                  <div className="row gy-5">
                      <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                          <figure className='p-2 position-relative'>
                          <video loop muted className="w-100 top-0 rounded-2 position-relative" autoPlay >
                            <source type="video/webm" src={`https://www.freetogame.com/g/${GameDetailes.id}/videoplayback.webm`}/>
                          </video>
                          <div className='p-2 start-0 end-0 top-0 bottom-0 position-absolute'>
                          <img src={GameDetailes.thumbnail} className={gameCss.img +' rounded-2 w-100 h-100'} alt={GameDetailes.title} />
                          <figcaption style={{top:'100%'}} className='d-flex px-2 py-3 justify-content-between start-0 end-0 align-items-center position-absolute'>
                                  <button className='btn bg-secondary col-3'>Free</button>
                                  <a href={GameDetailes.freetogame_profile_url} className='btn col-8 btn-primary'>PLAY NOW <i className='fa fa-sign-out-alt'> </i></a>
                          </figcaption>
                          </div>
                          </figure>
                      </div>
                      <div className={gameCss.gameDetColor +" col-lg-8 col-md-12 col-sm-12 col-12 fw-bold"}>
                          <h2 className={gameCss.h2 +' mb-3'}>{GameDetailes.title}</h2>

                          <h6 className={gameCss.h6 +' mb-2'}>About my {GameDetailes.title}</h6>

                          <p className={gameCss.p +' mb-5'}>{GameDetailes.description}</p>
                        
                          {GameDetailes.platform == 'Windows'?<div className="requirements mb-5">
                              <h4 className='mb-4'>Minemum System Requirements.</h4>
                              <p className='fw-light'><span className={gameCss.span}>graphics: </span>{GameDetailes.minimum_system_requirements.graphics}</p>
                              <p className='fw-light'><span className={gameCss.span}>memory: </span>{GameDetailes.minimum_system_requirements.memory}</p>
                              <p className='fw-light'><span className={gameCss.span}>os: </span>{GameDetailes.minimum_system_requirements.os}</p>
                              <p className='fw-light'><span className={gameCss.span}>processor: </span>{GameDetailes.minimum_system_requirements.processor}</p>
                              <p className='fw-light'><span className={gameCss.span}>storage: </span>{GameDetailes.minimum_system_requirements.storage}</p>
                          </div>:''}

                          {GameDetailes.screenshots == []?'':<div className="myslider mb-3">
                              <h4>World of {GameDetailes.title} Screenshots</h4>
                              <Slider {...settings}>
                                    {GameDetailes.screenshots.map((photo,index)=><div key={index}>
                                      <img className='w-100' src={photo.image} alt={photo.id} />
                                  </div>)}
                              </Slider>
                          </div> }

                          <div className="row gy-3">
                            <h2 className={gameCss.h2 + ' w-100'}>Additional Information</h2>
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <h5 className='fw-light text-muted'>Title</h5>
                                <p className='fw-bold fs-5'>{GameDetailes.title}</p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <h5 className='fw-light text-muted'>Developer</h5>
                                <p className='fw-bold fs-5'>{GameDetailes.developer}</p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <h5 className='fw-light text-muted'>Publisher</h5>
                                <p className='fw-bold fs-5'>{GameDetailes.publisher}</p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <h5 className='fw-light text-muted'>Release Date</h5>
                                <p className='fw-bold fs-5'>{GameDetailes.release_date}</p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <h5 className='fw-light text-muted'>Genre</h5>
                                <p className='fw-bold fs-5'>{GameDetailes.genre}</p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <h5 className='fw-light text-muted'>Platform</h5>
                                <p className='fw-bold fs-5'> {GameDetailes.platform == "Windows" ? <i className='fa-brands fa-windows text-muted'></i> : <i className='fa-solid fa-window-maximize text-muted'></i>} {GameDetailes.platform}</p>
                            </div>
                          </div>


                      </div>
                  </div>
              </div>
          </div>
      </section>}

  </>
}
