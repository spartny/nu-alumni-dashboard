

export function createHigherEdBar(data) {
    let highEdData = []
    for (const item in data){
        highEdData.push(data[item])
    }

    const gradYear = highEdData.map(item => item['GradYear']);
    let yearCount=[]
    let years=[]
    let uniqueYears={}
    gradYear.forEach(element => {
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

    return highEdData = {
        labels: years,
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
              label: 'Higher Education',
              data: yearCount,
              // you can set indiviual colors for each bar
              borderWidth: 1,
              backgroundColor: '#4f0002',
              borderColor: '#FFFFFF',
            }
        ]
      }
    
  }


