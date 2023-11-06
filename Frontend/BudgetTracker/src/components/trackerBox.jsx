import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ModeTracker from '../components/modeTracker';

export default function SimplePaper() {
 return (
   <Box
     sx={{
       display: 'flex', 
       flexDirection: 'row',
       '& > :not(style)': {
         m: 1,
         width: '30vw',
         height: '30vh', // Adjust this value as needed
         '@media (max-width: 600px)': {
           width: '100vw',
           height: '50vh',
         },
       },
     }}      
   >
     <Paper elevation={2} >
       <ModeTracker/>
       <ModeTracker/>
     </Paper>
   </Box>
 );
}
