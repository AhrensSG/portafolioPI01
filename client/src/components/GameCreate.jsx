import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { postGame, getGenres } from "../actions";
import { useDispatch, useSelector} from 'react-redux';
import c from './styles/created.module.css'




function control(input){
    let errors = {};
    if(!input.name || input.name === '') errors.name = 'Name is required.'
    if(!input.description || input.description==='') errors.description= 'descripcion is required'
    if(!input.rating || input.rating==='' || input.rating>5 || input.rating<1) errors.rating = 'rating es requerido con numero dle 1 al 5.'
    if(!input.platforms || input.platforms==='') errors.platforms = 'Plataformas is required.'
   
  
    const btn = document.getElementById('btn')
    btn.setAttribute('disabled', true)
    if(!Object.keys(errors).length) btn.removeAttribute('disabled')

    return errors
  }
export default function GameCreat(){
    const dispatch= useDispatch();
    const history= useHistory();
    const genres = useSelector((state) => state.genres);
    const [errors, serErrors]=useState({});
    const [input, setInput]=useState({
        name:'',
        description:'',
        released:'',
        rating:'',
        platforms:'',
        genres:[],
    });

    useEffect(()=>{
        dispatch(getGenres());
        control(input)
    }, []);

    function handlerChange(e){
        console.log(input)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        serErrors(control({
            ...input,
            [e.target.name]: e.target.value
        }));
    }
    
    function handlerSelect(e){
        
        if(!input.genres.includes(e.target.value)){
             setInput({
                ...input,
                genres: [...input.genres, e.target.value]
             })
        }
        else {
            
            setInput({
                ...input,
                
            })
            

        }

        
    }
    function generosName(e){
        if (e==1) {
            return 'Action'            
        }
        if (e==2) {
            return 'Indie'            
        }
        if (e==3) {
            return 'Adventur'            
        }
        if (e==4) {
            return 'RPG'            
        }
        if (e==5) {
            return 'Strategy'            
        }
        if (e==6) {
            return 'Shooter'            
        }
        if (e==7) {
            return 'Casual'            
        }
        if (e==8) {
            return 'Simulation'            
        }
        if (e==9) {
            return 'Puzzle'            
        }
        if (e==10) {
            return 'Arcade'            
        }
        if (e==11) {
            return 'Racing'            
        }
        if (e==12) {
            return 'Platformer'            
        }
        if (e==13) {
            return 'Multiplyer'            
        }
        if (e==14) {
            return 'Figthing'            
        }
        if (e==15) {
            return 'Sport'            
        }
        if (e==16) {
            return 'Famili'            
        }
        if (e==17) {
            return 'Board Game'            
        }
        if (e==18) {
            return 'Educational'            
        }
        if (e==19) {
            return 'card'            
        }
        return e+', ';
    }
        
    function handlerSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postGame(input));
        alert('se creo correctamente')
        setInput({
            name:'',
            description:'',
            released:'',
            rating:'',
            platforms:'',
            genres:[],
        })
        history.push('/home')
    }



    return (
        <div className={c.container}>
            <Link to ='/home'>
                <button className={c.volver}>Volver</button>
            </Link>
                <h1>Crea tu Juego</h1>
                <div className={c.formulario}>

                    <form onSubmit={e=> handlerSubmit(e)}>
                        <div className={c.separador}>
                            <label>Nombre:  </label>
                            <input
                                className={c.input}
                                type='text'
                                value={input.name}
                                name='name'  
                                onChange={handlerChange}                  
                            />
                            {errors.name && (<h3>{errors.name}</h3>)}
                        </div>
                        
                        <div className={c.separador}>
                            <label>Descripcion: </label>
                            <input
                                className={c.input}
                                type='text'
                                value={input.description}
                                name='description' 
                                onChange={handlerChange}
                            />
                            {errors.description && (<h3>{errors.description}</h3>)}
                        </div>
                        
                        <div className={c.separador}>
                            <label>Fecha de Creacion: </label>
                            <input
                                className={c.input}
                                type='date'
                                value={input.released}
                                name='released' 
                                onChange={handlerChange}                   
                            />
                        </div>
                        
                        <div className={c.separador}>
                            <label>Rating: </label>
                            <input
                                className={c.input}
                                type='text'
                                min="1" max="5"
                                value={input.rating}
                                name='rating' 
                                onChange={handlerChange}                   
                            />
                            {errors.rating && (<h3>{errors.rating}</h3>)}
                        </div>
                        
                        <div className={c.separador}>
                            <label>Plataformas: </label>
                            <input
                                className={c.input}
                                type='text'
                                value={input.platforms}
                                name='platforms' 
                                onChange={handlerChange}                   
                            />
                            {errors.platforms && (<h3>{errors.platforms}</h3>)}
                        </div>
                                            
                        <select className={c.input} onChange={e => handlerSelect(e)}>
                            <option value="none">Generos</option>
                            {genres && genres.map((e)=>(<option value={e.id}>{ generosName(e.id)}</option>))}
                        </select>
                        {errors.genres && (<h3>{errors.genres}</h3>)}
                        <div>
                            <ul><li>{input.genres.map(e=>{
                                if (e==1) {
                                    return 'Action, '            
                                }
                                if (e==2) {
                                    return 'Indie, '            
                                }
                                if (e==3) {
                                    return 'Adventur, '            
                                }
                                if (e==4) {
                                    return 'RPG, '            
                                }
                                if (e==5) {
                                    return 'Strategy, '            
                                }
                                if (e==6) {
                                    return 'Shooter, '            
                                }
                                if (e==7) {
                                    return 'Casual, '            
                                }
                                if (e==8) {
                                    return 'Simulation, '            
                                }
                                if (e==9) {
                                    return 'Puzzle, '            
                                }
                                if (e==10) {
                                    return 'Arcade, '            
                                }
                                if (e==11) {
                                    return 'Racing, '            
                                }
                                if (e==12) {
                                    return 'Platformer, '            
                                }
                                if (e==13) {
                                    return 'Multiplyer, '            
                                }
                                if (e==14) {
                                    return 'Figthing, '            
                                }
                                if (e==15) {
                                    return 'Sport, '            
                                }
                                if (e==16) {
                                    return 'Famili, '            
                                }
                                if (e==17) {
                                    return 'Board Game, '            
                                }
                                if (e==18) {
                                    return 'Educational, '            
                                }
                                if (e==19) {
                                    return 'card, '            
                                }
                                return e+', ';
                            })}</li></ul>
                        </div>
                        
                        <button className={c.volver} id="btn" type='submit'>Crear Personaje</button>
                    </form>
                </div>
            
        </div>
    );

}