

export default function createBarGraph(data) {
    // Extract subject names and marks from the JSON data
    const country = data.map(item => item.Country);
    let countryCount=[]
    let countries=[]
    let uniquecountry={}
    country.forEach(element => {
        if (uniquecountry[element]) {
            uniquecountry[element]++;
        } 
        else {
            uniquecountry[element] = 1;
        }
    });

    for (var key in uniquecountry){
        if(key in countries){
            continue
        }
        else{
            if(key != 0 & key !== 'India'){
                countries.push(key)
            }
            
        }
        if(key !== 0 & key !== 'India'){
            countryCount.push(uniquecountry[key])
        }
        
    }
    
    return data = {
      
      labels: countries,
      // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
      datasets: [
          {
            label: 'country',
            data: countryCount,
            // you can set indiviual colors for each bar
            borderWidth: 1,
          }
      ]
    } 
    }
