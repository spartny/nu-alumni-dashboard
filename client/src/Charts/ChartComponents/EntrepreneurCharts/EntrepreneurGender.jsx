import { Chart, Pie, defaults } from 'react-chartjs-2'

export default function EntrepreneurGender(props) {

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
                        text: "Entreprenuer Gender Ratio",
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
