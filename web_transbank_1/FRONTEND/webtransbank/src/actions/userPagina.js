import { ADD_USER_PAGINA, REMOVE_USER_PAGINA } from './types';
import api from '../api'

export const getUser = () => dispatch => {

    api.get('/pagina/get-user/', 
        {headers: {"content-type": "application/json", "site": localStorage.getItem('site'), 'userkey': localStorage.getItem('userkey')}}
    ).then(res=>{
        if (res && res.data) {
            dispatch({type: ADD_USER_PAGINA, payload: res.data})
        }
    })

}


export const logout = () => dispatch => {
    
    api.post('/pagina/logout/', 
        {},
        {headers: {"content-type": "application/json", "site": localStorage.getItem('site'), 'userkey': localStorage.getItem('userkey')}}
    ).then(res=>{
        if (res && res.data) {
            console.log(res)
            dispatch({type: REMOVE_USER_PAGINA, payload: res.data})
        }
    })
}