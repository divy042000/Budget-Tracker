import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Box from '@mui/material/Box';

const size = {
  width: '20vw',
  height: '20vh',
};


const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 12,
}));

function PieCenterLabel({children}) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel() {
  const [transaction, setTransaction] = useState([]);

  const data = [
    { value: 100},
    
  ];
  useEffect(() => {
    axios.get('your_backend_api_url')
      .then((response) => {
        setTransaction(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array means this effect runs once when the component mounts

  return (
    <div>
<Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  width="100%"
  height="100vh"
>
   <PieChart
    series={[{ data, innerRadius: 35, outerRadius: 40, startAngle: -145, endAngle: 145 }]}
    {...size}
  >
    <PieCenterLabel prop={transaction.join(', ')}>Hello</PieCenterLabel>
  </PieChart>
</Box>
    </div>
  );
}
