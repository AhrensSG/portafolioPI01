import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getGame, getGamesDb, getGamesByGenres, orderByName} from '../actions';
import {Link} from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import c from './styles/Home.module.css'



export default function Home(){
    const dispatch = useDispatch();
    const allGame = useSelector((state)=> state.games);
    const [currentPage, setCurrenPage]= useState(1);
    const [gamePerPage, setGamePerPage]= useState(9);
    const [order, setOrder] = useState('');
    const indexLastGame= currentPage * gamePerPage;
    const indexFirstGame= indexLastGame - gamePerPage;
    const currentGame = allGame.slice(indexFirstGame, indexLastGame);

    const paginado= (num)=>{
        return(
        setCurrenPage(num));
    }
    
    useEffect (()=>{
        dispatch(getGame())
    },[dispatch]);
    
    function handleClick(e){
        e.preventDefault();
        return dispatch(getGame());

    }
    function handleFilter(e) {
        e.preventDefault()
        if(e.target.value === 'all'){
           return dispatch(getGame())
        }
        if(e.target.value === 'allDb') {
           return dispatch(getGamesDb())
        }
        if (e.target.value==='none') {
            return;
        }
        if (e.target.value){
            return dispatch(getGamesByGenres(e.target.value))
        }
    }
    function handlerOrdenFilter (e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrenPage(1);
        setOrder (`Ordenado${e.target.value}`)
    }
    
    return (
        <div className={c.contenedor}>
            <div className={c.header}>
                <h1 className={c.h1home}>Videogames</h1>
                <Link  to='/videogames'><button className={c.buttonCreated}>Crear Juego</button></Link>
            </div>
            <div>
                <div className={c.botonFiltros}>
                    <div className={c.origen}>Origen: </div>
                    <select className={c.select} onChange={e => handleFilter(e)}>
                        <option className={c.input} value="none">Filter</option>
                        <option className={c.input} value="all">all Games</option>
                        <option value="allDb">games agregados</option>
                    </select>
                    <select className={c.select} onChange={e=>handleFilter(e)}>
                        <option value="none">Generos</option>
                        <option value="Action">Action</option>
                        <option value="Card">Card</option>
                        <option value="Indie">Indie</option>
                        <option value="Adventure">Adventure</option>
                        <option value="RPG">RPG</option>
                        <option value="Strategy">Strategy</option>
                        <option value="Shooter">Shooter</option>
                        <option value="Casual">Casual</option>
                        <option value="Simulation">Simulation</option>
                        <option value="Puzzle">Puzzle</option>
                        <option value="Arcade">Arcade</option>
                        <option value="Platformer">Platformer</option>
                        <option value="Racing">Racing</option>
                        <option value="Multiplayer">Massively Multiplayer</option>
                        <option value="Sports">Sports</option>
                        <option value="Fighting">Fighting</option>
                        <option value="Family">Family</option>
                        <option value="Board Games">Board Games</option>
                        <option value="Educational">Educational</option>
                    </select>
                    <select className={c.select} onClick={(e)=>handlerOrdenFilter(e)}>
                        <option value="or">Orden</option>
                        <option value="rat">rating</option>
                        <option value="asc">Ascendente</option>
                        <option value="des">Descendente</option>
                        
                    </select>
                </div>
                <SearchBar />
                <Paginado
                    gamePerPage={gamePerPage}
                    allGame={allGame.length}
                    paginado={paginado}
                />
                <div className={c.containeFlex}>
                    {
                    currentGame.map(e=>{
                            console.log(e)
                        return (
                            <div>
                    
                                <Link to={'/home'}></Link>
                                <Card createdInDb={e.createdInDb} id={e.id} img={e.img} name={e.name} genres={e.genres}/>
                    
                            </div>
                        );
                    })  
                    }
                </div>
            </div>
        </div>
    );
};