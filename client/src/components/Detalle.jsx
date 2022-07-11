import React from "react";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";
import { getGameById, clearDetail } from "../actions";
import c from './styles/detalle.module.css'

export default function Detalle(props){
    // console.log(props);
    const dispatch= useDispatch();
    const gameDetail= useSelector((state)=>state.detail)
    useEffect(()=>{
        dispatch(getGameById(props.match.params.id));
        dispatch(clearDetail());
    },[dispatch]);

    function generos(gameDetail){
        if(!gameDetail[0].createdInDb){
            return (gameDetail[0].genres.map(e => e + ' '))
        }else{
            return gameDetail[0].genres.map(e=> e.name + " ")
        }

    }
    function description(gameDetail){
        if (gameDetail[0].description){
            return(
                <h1>{gameDetail[0].description}</h1>
            )
        }
        return ('Sin Descripcion')
    }
    function imagen(gameDetail){
        if (gameDetail[0].img) {
            return gameDetail[0].img;           
        } else {
            return 'https://silverbryan.com.ar/static/5140c1c94588396cb7c358ddb5871dee/f836f/logo-henry.jpg'
        }
    }
    function detalle(gameDetail){
        if (gameDetail.length>0){
            console.log(gameDetail)
            return(
                <div className={c.card}>
                    <h1 className={c.titulo}>{gameDetail[0].name}</h1>
                    <img className={c.img} src={imagen(gameDetail)} alt="not found" />
                    <h2 className={c.textCard}>Descripcion: {description(gameDetail)}</h2>
                    <h2 className={c.textCard}>Fecha de Creacion: {gameDetail[0].released}</h2>
                    <h2 className={c.textCard}>Rating: {gameDetail[0].rating}</h2>
                    <h2 >Plataformas: {gameDetail[0].platforms? gameDetail[0].platforms : 'No existe' }</h2>
                    <h2 className={c.textCard}>Genero: {generos(gameDetail)}</h2>

                </div>
            )
        }else{
            return('Cargando...')
        }
    }

    return (
        <div className={c.card2}>
            {detalle(gameDetail)}
            <Link  to='/home'><button className={c.volver}>Volver</button></Link>
        
        </div>
    )

}