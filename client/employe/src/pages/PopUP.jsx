import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import EmployeForm from './EmployeForm';

 function PopperPopupState() {
  
  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button variant="contained" {...bindToggle(popupState)}>
            Add Employee
             </Button>
               <Popper {...bindPopper(popupState)} transition>
                 {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                     <Paper>  
                  <Typography sx={{ p: 2 }}>
                       
                   <EmployeForm/>

                  </Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}

export default PopperPopupState
