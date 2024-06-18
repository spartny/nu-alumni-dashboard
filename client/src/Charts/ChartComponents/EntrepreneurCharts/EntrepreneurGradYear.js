

export default function createEntrepreneurGraduatesBar(data) {
    const country = data.map(item => item['GradYear']);
    let yearCount=[]
    let years=[]
    let uniqueYears={}
    country.forEach(element => {
        if (uniqueYears[element]) {
            uniqueYears[element]++;
        } 
        else {
            uniqueYears[element] = 1;
        }
    });

    for (var key in uniqueYears){
        if(key in years){
            continue
        }
        else{
            if(key != 0){
                years.push(key)
            }
            
        }
        if(key !== 0){
            yearCount.push(uniqueYears[key])
        }
        
    }

    return data = {
    
        labels: years,
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
              label: 'Total Students',
              data: yearCount,
              // you can set indiviual colors for each bar
              borderWidth: 1,
              backgroundColor: '#AE0000',
              borderColor: '#FFFFFF',
    
            }
        ]
      }
    
  }

  export function gradDataForHighEd(gradData, higherEdData){
    const higherEdGradData = JSON.parse(JSON.stringify(gradData))
  
  higherEdGradData.datasets[0].data.forEach((element, index) => {
    higherEdGradData.datasets[0].data[index] = higherEdGradData.datasets[0].data[index] - higherEdData.datasets[0].data[index]
  
  });

  const combinedHighEdData = {
          labels: higherEdGradData.labels,
          datasets:[
            {
              label: "Other Students",
              data: higherEdGradData.datasets[0].data,
              backgroundColor: '#AE0000',
              borderColor: '#FFFFFF'
            },
            higherEdData.datasets[0],
          ]
      }

return combinedHighEdData
}