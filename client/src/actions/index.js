import axios from 'axios';

export function getGame (){
    return async function(dispach){
        var json= await axios('/videogames');
        return dispach({
            type: 'GET_GAMES',
            payload: json.data
        })

    }
}
export function filterGameDb (payload){
    return {
        type: 'FILTER_VALUE',
        payload
    }
}

export function getGamesDb(){
    return async (dispach) => {
        const gamesDb = await axios.get('/getGamesDb')
        return dispach({
            type: 'GET_GAMES_DB',
            payload: gamesDb.data
        })
    }
}

export function getGamesByGenres(genre){
    return async (dispach)=>{
        const filter = await axios.get('/getByGenres?genre='+genre)
        return dispach({
            type: 'GET_GAMES_BY_GENRE',
            payload: filter.data
        })
    }
}
export function orderByName (payload){
    return{
        type: 'ORDER_BY_NAME',
        payload,
    }
}
export function getByName(name){
    return async function (dispach){
        try {
            let json= await axios.get('/videogames?name='+name)
            return dispach({
                type:'GET_BY_NAME',
                payload: json.data
            })
        } catch (error) {
            alert(error.response.data)
        }
    }
} 
export function getGenres(){
    return async function (dispatch){
        let info= await axios.get('/genres',{});
        return dispatch({type:'GET_GENRES', payload:info.data})
    }
}
export function postGame(payload){
    return async function(dispach){
        const response = axios.post('/videogames',payload);
        return response;
    }
} 

export function getGameById(id){
    return async function(dispach){
        try {
            var json= await axios.get('/videogames/'+id)
            return dispach({
                type:'GET_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }

}
export function clearDetail(){
    return async function(dispach){
        return dispach({
            type:'CLEAR',
        })
    }
}