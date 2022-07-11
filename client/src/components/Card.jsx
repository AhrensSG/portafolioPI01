import React from "react";
import { Link } from "react-router-dom";
import s from './styles/Card.module.css'

export default function ({ createdInDb, id, img, name, genres}){
    function notFound(im){
        if (im){
            return ( <img className={s.img} src={im} alt='img not found' />);
        }else{
            return (<img className={s.img} src="https://silverbryan.com.ar/static/5140c1c94588396cb7c358ddb5871dee/f836f/logo-henry.jpg" />);
        }
    }
    console.log(createdInDb)
    return (
        <div className={s.card}>
        <Link className={s.Link} to={`/home/${id}`}>
            <h1 >{name}</h1>
            {notFound(img)}
            <div className={s.generos}>
                {
                    createdInDb? genres.map(e => {
                        return(
                            <h2>{e.name + ', '+' '}</h2>
                        )
                    }): genres.map(e => ( <h2 >{e+', '+' '}</h2> ))
                }
            </div>
        </Link>
        </div>
    );
}