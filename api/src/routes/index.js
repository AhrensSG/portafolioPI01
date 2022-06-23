const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios= require ("axios");
const {Videogame, Gender} = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
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
// const getApiP= async ()=>{
//     const apiUrl= await axios.get("https://api.rawg.io/api/games?key=f36ebe4de06e48cfbb38c8f780ef290f");
//     const apiData= await apiUrl.data.results.map(e=>{
//         return {
//             img: e.background_image,
//             name: e.name,
//             genres: e.genres.map(e=> e.name)
//         }
//     })
    
//     return apiData;
// };
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


router.get('/videogames', async (req, res)=>{
    
        let all = await getAllGame();
        let name = req.query.name;
        if (name) {
            let result = await all.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            if(result.length!==0){

                res.status(200).send(result);
            }else{
                res.status(200).send("No se encontro tu Game ");
            }
            
        } else {
            res.status(200).send(all);
        };
    
});
router.get('/genres', async (req, res)=>{
    const getApiGenres= await axios.get("https://api.rawg.io/api/genres?key=f36ebe4de06e48cfbb38c8f780ef290f");
    let gen= getApiGenres.data.results.map(e => e.name);
    gen.forEach(e => {
        Gender.findOrCreate({
            where: {name: e},
        })
    });
    let allGenres= await Gender.findAll();
    res.send(allGenres);
});
router.post('/videogames', async (req, res)=>{
    let {
        name,
        description,
        released,
        rating,
        platforms,
        genres,
        createdInDb
    }= req.body;
    let newGame={
        name,
        description,
        released,
        rating,
        platforms,
        createdInDb
    };
    Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
        genres,
        createdInDb
    });

    // let newGame= await Videogame.create({
    //     name,
    //     description,
    //     released,
    //     rating,
    //     platforms,
    //     createdInDb
    // });
    // let genresDb= await Gender.findAll({
    //     where:{name : genres}
    // });
    // console.log(newGame);
    // newGame.addGender(genresDb);
    res.send(newGame);

});
router.get('/videogames/:id', async (req, res)=>{
    const {id}= req.params;
    let all= await getAllGame();
    if (id){
        let game= await all.filter(e=>e.id==id);
        if (game.length!==0) {
            res.status(200).send(game)
            
        } else {
            res.status(200).send('no se ecnontro el juego ');
        };
    };
});



module.exports = router;
