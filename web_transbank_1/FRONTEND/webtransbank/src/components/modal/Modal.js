import React from 'react';
import ReactDOM from 'react-dom';
import './modalStyles.css'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const Modal = ({component, ondismiss, titulo}) => {
  return ReactDOM.createPortal(
    <div className='modalCont'>
      <div className='modalWindow'>
        <div className='modalWindow2'>
          <div className='optionSup'>
            <Button onClick={ondismiss} variant='outlined' color="primary">
              Volver
            </Button>
            <Typography style={{marginLeft:'20px'}}  color="textSecondary" >
              {titulo}
            </Typography>
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
