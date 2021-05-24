import { ADD_ADMIN_PAGINA, REMOVE_ADMIN_PAGINA  } from './types';
import api from '../api'

export const getAdmin = () => dispatch => {

    api.get('/pagina/get-admin/', 
        {headers: {"content-type": "application/json", "site": localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
    ).then(res=>{
        if (res && res.data) {
            dispatch({type: ADD_ADMIN_PAGINA, payload: res.data})
        }
    })

}


export const logoutAdmin = () => dispatch => {
    console.log('work')
    api.post('/pagina/logout-admin/', 
        {},
        {headers: {"content-type": "application/json", "site": localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
    ).then(res=>{
        if (res && res.data) {
            console.log(res)
            dispatch({type: REMOVE_ADMIN_PAGINA, payload: res.data})
        }
    })
}