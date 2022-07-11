
const initialState={
    games: [],
    genres: [],
    detail:[]

};

function rootReducer (state= initialState, action){
    switch (action.type) {
        case 'GET_GAMES':
            return{
                ...state,
                games: action.payload
            };
        case 'GET_GAMES_DB':
            return {
                ...state,
                games: action.payload,
            }
        case 'GET_GAMES_BY_GENRE':
            return{
                ...state,
                games: action.payload
            }
        case 'ORDER_BY_NAME':
            let orderArr= []
            if (action.payload==='asc') {
                orderArr= state.games.sort(function(a, b){
                    if (a.name>b.name) {
                        return 1;
                    }
                    if (b.name>a.name) {
                        return -1;
                    }
                    return 0;
                })
                
            } if (action.payload==='des') {
                orderArr= state.games.sort(function(a, b){
                    if (a.name>b.name) {
                        return -1;
                    }
                    if (b.name>a.name) {
                        return 1;
                    }
                    return 0;
                })
            }else{
                if (action.payload==='rat') {
                    
                
                    orderArr= state.games.sort(function(a,b){
                        return b.rating-a.rating;
                    })
                }else {
                    return state;
                }
            }
            return{
                ...state,
                games: orderArr,
            }
        case 'GET_BY_NAME':
            return{
                ...state,
                games: action.payload
            }
        case 'POST_GAME':
            return {
                ...state,
            }
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload,
            }
        case 'GET_DETAIL':
            return{
                ...state,
                detail:action.payload
            }
        case 'CLEAR':
            return{
                ...state,
                detail:[]
            }
        default:
            return state;
    };
};
export default rootReducer;