const axios= require ("axios");
const { Router } = require('express');
const Genres = require("../models/Genres");




// getApi().then(e=>{console.log(e)});

const getDbInfo = async ()=>{
    return Videogame.findAll({
        include:{
            model: Genres,
            atributes: ['name'],
            through:{
                atributes: [],
            },
        }
    });
};
const getAllGame= async ()=>{
    const apiInfo= await getApi();
    const apiDb= await getDbInfo();
    const conc= apiInfo.concat(apiDb);
    return await conc;
};


const getApp = async ()=>{
    let all = await getAllGame();
        let name = req.query.name;
        if (name) {
            let result = await all.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            if(result.length!==0){
                res.status(200).send(result);
            }else{
                res.status(200).send("No se encontro tu Game ",name);
            }
            
        } else {
            res.status(200).send(all);
        };
};
