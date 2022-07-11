import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../actions";
import c from './styles/Search.module.css'

export default function SearchBar(){
    const dispatch= useDispatch();
    const [name, setName]= useState('')
    function handleSearch(e){
        e.preventDefault()
        setName(e.target.value)        
    }
    function handleSubmit(e){
        e.preventDefault()
        setName("")
        dispatch(getByName(name))
               
    }
    return (
        <div className={c.div}>
            <input className={c.input} 
                id="input"
                type="text" 
                placeholder="Search"
                onChange={e=>handleSearch(e)}
            />
            <button className={c.bootom} type="submit" onClick={e=> handleSubmit(e)}>Buscar</button>
        </div>
    )
}