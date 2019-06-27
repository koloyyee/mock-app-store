import {LOAD_DATA}  from './actions'

const initState = {
    topFree:[],
    topGrossing:[]
}

const listReducer=( state = initState, action)=>{
    switch(action.type){
        case LOAD_DATA:
            if(action.category === 'top-grossing'){
                return {
                    ...state,
                    topGrossing:action.data
                }
            } 
            
            if(action.category === 'top-free'){
                return {
                    ...state,
                    topFree:action.data
                }
            }
            break;
        default:
            return state
    }
}


export default listReducer