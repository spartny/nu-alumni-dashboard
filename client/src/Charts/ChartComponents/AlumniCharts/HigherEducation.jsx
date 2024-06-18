import React from 'react'
import { Bar } from 'react-chartjs-2'

export default function HigherEducation(props) {
  return (
        <Bar
              data={props.higherEdGradData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  responsive: true,
                }
              }}
            />
  )
}
