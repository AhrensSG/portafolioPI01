import React from "react";
import c from './styles/Paginado.module.css'

export default function Paginado({gamePerPage, allGame, paginado}){
    const pageNumbers=[];
    for (let i=0; i<= Math.ceil(allGame / gamePerPage); i++) {
          pageNumbers.push(i+1);
    }
    pageNumbers.pop()
    
    return(
        <nav>
            <ul className={c.ul} >
                {
                    
                    pageNumbers.map(number=>(( 
                        <li className={c.li} key={number}>
                            <a onClick= {()=> paginado(number)}>{number}</a>
                            
                        </li>
                    )
                    ))
                }
            </ul>
        </nav>
    );
};