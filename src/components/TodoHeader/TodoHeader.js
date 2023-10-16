import React from 'react';
import moment from 'moment'
import AddCircleIcon from '@mui/icons-material/AddCircle'; import './TodoHeader.css';
import DialogModal from '../Dialog/DialogModal';
import DisplayTodo from '../DisplayTodo/DisplayTodo';

const whiteColor = '#fff';

const styles = {
   wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '95%'
   },
   finished: {
      fontSize: '46px',
      color: whiteColor
   },
   total: {
      display: 'flex',
      flexDirection: 'column',
      color: whiteColor
   },
   weekDay: {
      color: whiteColor,
      fontSize: '28px'
   },
   date: {
      color: whiteColor,
      fontSize: '28px',
      marginLeft: 10
   }
}

const TodoHeader = ({
   handleOpenDialog,
   isOpen,
   handleSetFieldValue,
   formData,
   handleSetTodoOnSubmit,
   isOpenDisplayTodo,
   handleCloseButton,
   handleEditTodo,
   handleRemoveTodo,
   totalCount
}) => {
   const weekDay = moment().format('dddd');
   const data = moment().date()
   return (
      <div className='todo-header'>
         <div style={styles.wrapper}>
            <div className='todos-count'>
               <span style={styles.finished}>{`${totalCount.finished}`}</span>
               <div style={styles.total}>
                  <span>Tasks</span>
                  <span>{`/ ${totalCount.total}`}</span>
               </div>
            </div>
            <div>
               <span style={styles.weekDay}>{weekDay}</span>
               <span style={styles.date}>{data}</span>
            </div>
         </div>
         <div className='add-todo' onClick={handleOpenDialog}>
            <AddCircleIcon htmlColor='#3f51b5' />
            <span className='icon-background' />
         </div>
         <DialogModal
            handleOpenDialog={handleOpenDialog}
            isOpen={isOpen}
            handleSetFieldValue={handleSetFieldValue}
            formData={formData}
            handleSetTodoOnSubmit={handleSetTodoOnSubmit} />
         <DisplayTodo
            formData={formData}
            isOpen={isOpenDisplayTodo}
            handleCloseButton={handleCloseButton}
            handleEditTodo={handleEditTodo}
            handleRemoveTodo={handleRemoveTodo} />
      </div>

   )
}

export default TodoHeader;