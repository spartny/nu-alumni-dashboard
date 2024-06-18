import React, { useRef } from 'react'
import { Chart, Pie, defaults } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'


export default function GenderPie(props) {
  return (
        <Chart
                type = 'pie'
                data={props.genderData}
                
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                  plugins: {
                    title: {
                        display: true,
                        text: "Alumni Gender Ratio",
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
