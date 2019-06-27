import {loadData, failed} from './actions'
import axios from 'axios'

const {REACT_APP_API_SERVER} = process.env

export const loadDataThunk = (category, num)=>{
    return async(dispatch)=>{
        const res = await axios(`${REACT_APP_API_SERVER}/${category}/${num? `${num}` : "10"}`)
        if ( res.data ){
            dispatch(loadData(res.data,category))
        }else{
            dispatch(failed('failed to fetch'))
        }
    }
}


