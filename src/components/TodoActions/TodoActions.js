import React from 'react';
import './TodoActions.css';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ListIcon from '@mui/icons-material/List';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ChecklistIcon from '@mui/icons-material/Checklist';

const TodoActions = ({
   tab,
   handleChangeTab
}) => {
   return (
      <div className='actions-wrapper'>
         <Tabs value={tab} onChange={(e, tabValue) => handleChangeTab(tabValue)}>
            <Tab label={<ListIcon />} />
            <Tab label={<RadioButtonUncheckedIcon />} />
            <Tab label={<ChecklistIcon />} />
         </Tabs>
      </div>
   )
}

export default TodoActions;