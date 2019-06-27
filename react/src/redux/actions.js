export const LOAD_DATA = "LOAD_DATA"
export const FAILED = "FAILED"


export  const loadData=(data, category)=>{
 return{
     type: LOAD_DATA,
     data,
     category
 }
}
export const failed=(msg)=>{
    return{
        type: FAILED,
        msg
    }
}