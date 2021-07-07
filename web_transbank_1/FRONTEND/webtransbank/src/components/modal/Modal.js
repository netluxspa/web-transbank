import React from 'react';
import ReactDOM from 'react-dom';
import './modalStyles.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import history from '../../history';



const Modal = ({component, ondismiss, titulo}) => {
  return ReactDOM.createPortal(
    <div className='modalCont'>
      <div className='modalWindow'>
        <div className='modalWindow2'>
          <div className='optionSup'>
            <div>
              <Button onClick={ondismiss} variant='outlined' color="primary">
                Volver
              </Button>
              <CloseIcon onClick={()=>history.push('/tienda')} style={{cursor:'pointer'}} />
            </div>
            <div style={{margin:'10px 0 5px 5px'}}>
            <Typography  color="textSecondary" >
              {titulo}
            </Typography>
            </div>
          </div>
          <br></br>
          <br></br>
          {component}
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
