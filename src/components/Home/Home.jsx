import React, { useEffect, useState } from 'react'
import myCss2 from './home.module.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import LodingScrean from '../loadingScreen/LodingScrean';
export default function Home() {
    const [someGames, setsomeGames] = useState(null);

    async function getSomeGames(){
        try {
            const {data} = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games',{
                headers:{
                    'X-RapidAPI-Key': '0a9f769d69msh9c403cce9468d75p14656fjsn411835be2e8e',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            })

            console.log(data);
            setsomeGames(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function(){
        getSomeGames();
    },[])

  return <>
        <section className={myCss2.homeIntro +" homeIntro"}>
            <h1 className='w-100'>Find & track the best <span>free-to-play</span> games!</h1>
            <p className='w-100'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
            <Link className='btn btn-outline-secondary mt-3' to={'/all'}>Browse Games</Link>
        </section>
        {someGames == null ?<LodingScrean/> :<section className='py-5'>
            <div className="container py-5 px-3">
                <h2 className={myCss2.h2 +" w-100 mb-5"}><i className="fas fa-robot mr-2"></i>Personalized Recommendations</h2>
                <div className="row gy-3">
                    <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                      <Link className='link-dark text-decoration-none' to={`/game-detailes/${someGames[8].id}`}>
                          <div className={myCss2.item + " rounded overflow-hidden rounded-3"}>
                              <figure><img src={someGames[8].thumbnail} alt={someGames[8].title} className='w-100' /></figure>
                              <figcaption className='d-flex justify-content-between py-3 px-3 align-items-center'>
                                  <h3 className={myCss2.h2}>{someGames[8].title}</h3>
                                  <button className='btn btn-primary'>Free</button>
                              </figcaption>
                          </div>
                      </Link>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <Link className='link-dark text-decoration-none' to={`/game-detailes/${someGames[9].id}`}>
                          <div className={myCss2.item + " rounded overflow-hidden rounded-3"}>
                              <figure><img src={someGames[9].thumbnail} alt={someGames[9].title} className='w-100' /></figure>
                              <figcaption className='d-flex justify-content-between py-3 px-3 align-items-center'>
                                  <h3 className={myCss2.h2}>{someGames[9].title}</h3>
                                  <button className='btn btn-primary'>Free</button>
                              </figcaption>
                          </div>
                      </Link>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <Link className='link-dark text-decoration-none' to={`/game-detailes/${someGames[11].id}`}>
                          <div className={myCss2.item + " rounded overflow-hidden rounded-3"}>
                              <figure><img src={someGames[11].thumbnail} alt={someGames[11].title} className='w-100' /></figure>
                              <figcaption className='d-flex justify-content-between py-3 px-3 align-items-center'>
                                  <h3 className={myCss2.h2}>{someGames[11].title}</h3>
                                  <button className='btn btn-primary'>Free</button>
                              </figcaption>
                          </div>
                      </Link>
                    </div>
                </div>
            </div>
        </section>}
  
  </>
}
