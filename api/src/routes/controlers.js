const axios= require ("axios");
const { Router } = require('express');

const getApi= async ()=>{
    const apiUrl= await axios.get("https://api.rawg.io/api/games?key=f36ebe4de06e48cfbb38c8f780ef290f");
    const apiData= await apiUrl.data.results.map(e=>{
        return {
            id: e.id,
            img: e.background_image,
            name: e.name,
            description: e.description,
            released: e.released,
            rating: e.rating,
            platforms: e.platforms.map(e=>e.platform.name),
            genres: e.genres.map(e=> e.name)
        }
    })
    
    return apiData;
};
// getApi().then(e=>{console.log(e)});

const getDbInfo = async ()=>{
    return Videogame.findAll({
        include:{
            model: Gender,
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
