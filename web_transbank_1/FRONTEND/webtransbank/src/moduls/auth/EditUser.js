import Alert from '@material-ui/lab/Alert';
import FormAuth from './FormAuth'
import api from '../../api'
import { ADD_USER_PAGINA } from '../../actions/types'
import {useState} from 'react';
import { useDispatch } from 'react-redux';

const EditUser = () => {
const dispatch = useDispatch();

    const [updatedUser, putUpdatedUser] = useState(null)

    const updateUser = (data) => {
        api.patch(`pagina/user-pagina/${data.id}/`,
        data, 
        {headers: {
            "site": localStorage.getItem("site"),
            "userkey": localStorage.getItem("userkey")
        }}
        ).then(res=>{
            console.log(res)
            dispatch({type: ADD_USER_PAGINA, payload: res.data})
            putUpdatedUser(true)
            setTimeout(() => {
                putUpdatedUser(null)
            }, 3000);
        }).catch(err=>console.log(err))
    }

    return (
        <div>
            {updatedUser ? <Alert severity="success">Usuario actualizado con exito</Alert>: null}
            <FormAuth returnData={(data)=>updateUser(data)} />
        </div>
    )
}

export default EditUser;