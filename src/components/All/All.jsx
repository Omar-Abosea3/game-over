import axios from 'axios';
import React, { useEffect, useState } from 'react'
import myAllCss from './all.module.css';
import $ from 'jquery';
import LodingScrean from '../loadingScreen/LodingScrean';
import { Link } from 'react-router-dom';
export default function All(){

    const [allGames, setallGames] = useState(null);
    let [itemNum, setitemNum] = useState(25);

    async function getAllGames(incItems){
        try {
            const {data} = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games',{
                headers:{
                    'X-RapidAPI-Key': '0a9f769d69msh9c403cce9468d75p14656fjsn411835be2e8e',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            })
            incItems(data);
        } catch (error) {
            console.log(error);
        }
    }

    function checkingItemNum(){
        if(itemNum >= 326){
            $('#addBtn').addClass('d-none');
        }else{
            setitemNum(itemNum+=25);
            getAllGames(incNumberOfItems);
        }
    }

    function incNumberOfItems(data){
        let arrOfGames = [];
            for( let i=0 ; i <= itemNum ; i++ ){
                arrOfGames.push(data[i]);
            }
            console.log(allGames);
            console.log(arrOfGames);
            setallGames(arrOfGames);
    }

    useEffect(function(){
        getAllGames(incNumberOfItems);
    },[])
  return <>
    {allGames == null ? <LodingScrean/>: <div className="container py-5 px-3">
          <div className="row gy-3">
                {allGames.map((game , index) =><div key={index} title={ "Available on "+ game.platform} className="col-lg-3 col-md-6 col-sm-12 col-12">
                <Link className='link-dark text-decoration-none' to={`/game-detailes/${game.id}`}>
                      <div className={myAllCss.item2 + " rounded overflow-hidden rounded-3"}>
                        <figure><img src={game.thumbnail} alt={game.title} className='w-100' /></figure>
                        <figcaption className='d-flex justify-content-between pt-3 px-3 align-items-center'>
                          <h3 className={myAllCss.h3}>{game.title.slice(0, game.title.indexOf(' ', 15))}</h3>
                          <button className='btn btn-primary'>Free</button>
                        </figcaption>
                        <p className={myAllCss.p + ' px-3'}>{game.short_description.slice(0, game.short_description.indexOf(' ', 20))}...</p>
                        <ul className='list-unstyled px-3 d-flex justify-content-between align-items-center'>
                          <li><i className='fa fa-plus-square text-secondary'></i></li>
                          <li><span className={myAllCss.mySpan + ' rounded rounded-4'}>{game.genre}</span> {game.platform == "PC (Windows)" ? <i className='fa-brands fa-windows text-muted'></i> : <i className='fa-solid fa-window-maximize text-muted'></i>}</li>
                        </ul>
                      </div>
                </Link>
              </div>) }
              <button id='addBtn' onClick={checkingItemNum} className='btn btn-outline-secondary'>More Games <i className='fa fa-arrow-right'></i></button>
          </div>
      </div>}
  </>
}
