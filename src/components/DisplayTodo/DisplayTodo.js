import React from 'react';
import './DisplayTodo.css';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const DisplayTodo = ({
   isOpen,
   formData,
   handleCloseButton,
   handleEditTodo,
   handleRemoveTodo
}) => {
   return (
      <Dialog open={isOpen} onClose={handleCloseButton}>
         <div className='display-todo-title'>
            <DialogTitle>Your Todo</DialogTitle>
         </div>
         <DialogContent >
            <h2>{formData.todoName}</h2>
            <div>{formData.todoNote}</div>
         </DialogContent>
         <DialogActions>
            <div className='display-buttons-wrapper'>
               <Button color='secondary' variant='outlined' onClick={handleRemoveTodo}>Remove</Button>
               <div>
                  <Button onClick={handleCloseButton}>Close</Button>
                  <Button onClick={handleEditTodo}  >Edit</Button>
               </div>
            </div>
         </DialogActions>
      </Dialog>
   )
}

export default DisplayTodo;