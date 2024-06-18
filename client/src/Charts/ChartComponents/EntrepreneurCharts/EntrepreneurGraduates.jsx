import React from 'react'
import { Bar, Chart } from 'react-chartjs-2'

export default function EntrepreneurGraduates(props) {
  return (
        <Chart
              type='bar'
              data={props.gradData}
              options={{
                maintainAspectRatio: false, 
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: "Entreprenuers by Year",
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
