

export default function createDesignationsBar(data) {
    const entrepreneurDesignation = data.map(item => item['Designation']);
    let designationCount=[]
    let designations=[]
    let uniqueDesignations={}
    entrepreneurDesignation.forEach(element => {
        if (uniqueDesignations[element]) {
            uniqueDesignations[element]++;
        } 
        else {
            uniqueDesignations[element] = 1;
        }
    });

    for (var key in uniqueDesignations){
        if(key in designations){
            continue
        }
        else{
            if(key !== 0){
                designations.push(key)
            }
            
        }
        if(key !== 0){
            designationCount.push(uniqueDesignations[key])
        }
        
    }

    return data = {
    
        labels: designations,
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
              label: 'Total Students',
              data: designationCount,
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
              label: "Employed",
              data: higherEdGradData.datasets[0].data,
              backgroundColor: '#AE0000',
              borderColor: '#FFFFFF'
            },
            higherEdData.datasets[0],
          ]
      }

return combinedHighEdData
}