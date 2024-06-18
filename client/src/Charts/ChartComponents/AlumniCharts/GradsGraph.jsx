import React from 'react'
import { Bar, Chart, Line } from 'react-chartjs-2'


export default function GradGraph(props) {
  return (
        <Line
              type='line'
              data={props.gradData}
              options={{
                maintainAspectRatio: false, 
                responsive: true,
                lineTension: 0.2,
                backgroundColor: 'rgba(150,0,0,0.7)',
                borderColor: 'rgba(96,0,0,1)',
                pointBackgroundColor: 'rgba(96,0,0,1)',
                pointBorderColor: 'rgba(96,0,0,1)', 
                pointBorderWidth: 4,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                fill: {
                  target: 'origin',
                  above: 'rgba(150,0,0,0.7)',
                  below: 'rgb(0,0,0)',
                },
                plugins: {
                  
                    title: {
                        display: true,
                        text: "Alumni Graduates per Year",
                        color:'#172626',
                        position:'bottom',
                        
                        font:{
                          size:"15px",
                          family: "'Inter', sans-serif" 
                        }
                    }
                }
            }}
            />
  )
}
