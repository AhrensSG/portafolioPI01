const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios= require ("axios");
const {Videogame, Genres,} = require('../db');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApi= async ()=>{
    const apiUrl1= await axios.get("https://api.rawg.io/api/games?key=f36ebe4de06e48cfbb38c8f780ef290f&page=1&page_size=40");
    const apiUrl2= await axios.get("https://api.rawg.io/api/games?key=f36ebe4de06e48cfbb38c8f780ef290f&page=2&page_size=40");
    const apiUrl3= await axios.get("https://api.rawg.io/api/games?key=f36ebe4de06e48cfbb38c8f780ef290f&page=3&page_size=40")
    const apis =await apiUrl1.data.results.concat(apiUrl2.data.results).concat(apiUrl3.data.results);
    const apiData= await apis.map(e=>{
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



const getGenresApi = async () => {
    const genres = await axios.get("https://api.rawg.io/api/genres?key=f36ebe4de06e48cfbb38c8f780ef290f")
    return genres.data.results;
}

const gamesByGenre = async (req, res) => {
    const genres = await getGenresApi();
    const games = await getApi();
    const { genre } = req.query;
    try {
        const gamesView = [];
        genres.forEach(g=>{
            games.forEach(e=>{
                if (g.name===genre) {
                    g.games.forEach(f=>{
                        if (f.id===e.id) {
                            gamesView.push(e)
                        }
                    })
                }
            });
        });
        res.status(200).send(gamesView);
    } catch (error) {
        res.status(400).send({data:error.mesaje})
    }
        
}
router.get('/getByGenres', async (req, res)=>{
    gamesByGenre(req, res);
})

const getDbInfo = async ()=>{
    return Videogame.findAll({
        include:{
            model: Genres,
            attributes: ['name'],
            through:{
                atributes: [],
            },
        },
    });
};

const getAllGame= async ()=>{
    const apiInfo= await getApi();
    const apiDb= await getDbInfo();
    const conc= apiInfo.concat(apiDb);
    return await conc;
};

router.get('/getGamesDb', async (req, res) => {
    try {
        const gamesDb = await getDbInfo();
        res.status(200).send(gamesDb)
        
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get('/videogames', async (req, res)=>{
    
        let all = await getAllGame();
        let name = req.query.name;
        if (name) {
            let result = await all.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            if(result.length!==0){

                return res.status(200).send(result);
            }else{
                return res.status(400).send('Game not found');
            }
            
        } else {
            return res.status(200).send(all);
        };
    
});
router.get('/genres', async (req, res)=>{
    try {
        const getApiGenres= await axios.get("https://api.rawg.io/api/genres?key=f36ebe4de06e48cfbb38c8f780ef290f");
        let gen= getApiGenres.data.results.map(e => e.name);
        gen.forEach(e => {
            Genres.findOrCreate({
                where: {name: e},
            })
        });
        let allGenres= await Genres.findAll();
        res.send(allGenres);
    } catch (error) {
        res.status(404).send({ data: error.message })
    }
});
router.post('/videogames', async (req, res)=>{
    try {
        let {
            name,
            description,
            released,
            rating,
            platforms,
            genres,
            createdInDb
        }= req.body;

        const createdGame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            createdInDb
        });
        await createdGame.addGenres(genres)

        res.status(200).send('Create game completed');
        
    } catch (error) {
        res.status(404).send(error.message)
    }

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
router.put('/:id'), async (req, res)=>{
        const id=req.params.id;
        console.log(id)
        let {name,
            description,
            released,
            rating,
            platforms
        }=req.body;
        await Videogame.User.update({name, description, released, rating, platforms},{
                where: {
                    id: req.params.id
                }
            })
        
        res.status(200).send('se actualizo correctamente')
}
router.delete('/videogames/:id'), async (req, res)=>{
    const {id}=req.params
    try {
        await Videogame.destroy({
            where:{
                id,
            }
        })
        res.status(200).send('se elimino correctamente')
    } catch (error) {
        console.log(id)
        res.status(404).send(error.message)
    }
}


module.exports = router;
