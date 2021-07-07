import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';


import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function SimpleMenu({goMainEditProducto, goEspecificEditProducto}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      <MoreVertIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
            <Button onClick={()=>goMainEditProducto()} className='smallText' style={{marginRight:'10px'}} variant="outlined" size="small" color="primary">
                <EditIcon />
            </Button>
            <Button onClick={()=>goEspecificEditProducto() } className='smallText'  variant="outlined" size="small" color="secondary">
                    <ViewComfyIcon />
            </Button>
        </MenuItem>
      </Menu>
    </div>
  );
}
