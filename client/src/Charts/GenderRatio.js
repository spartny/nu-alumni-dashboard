import { plugins } from "chart.js";

export default function createGenderPie(data, years, setSelectedGraph) {
    // Extract subject names and marks from the JSON data
   
    // console.log(data)
    const newYears = []
    for (let i=0; i<years.length; i++){
        newYears.push(parseInt(years[i]))
    }
    const genderYears = data.map((item) => item['Graduating Year ']);
    const gender = data.map((item) => item.Gender);
    let genderCount=[]
    let Genders=[]
    let uniqueGender={}
    
    for (let i=0; i<gender.length; i++) {
        const gender = data[i].Gender;
        const graduatingYear = parseInt(data[i]['Graduating Year ']);
    
    if (!isNaN(graduatingYear) && newYears.includes(graduatingYear)) {
        if (gender in uniqueGender) {
            uniqueGender[gender]++;
        } else {
            uniqueGender[gender] = 1;
        }
    }
}
// console.log(uniqueGender)

    
    
    
    for (var key in uniqueGender){
        if(key in Genders){
            continue
        }
        else{
            
            Genders.push(key)
        }
        genderCount.push(uniqueGender[key])
    }

    return data = {
        labels: Genders,
        datasets: [{
            label: 'Gender',
            data: genderCount,
            plugins: {
                
            },
            backgroundColor: ['#AE0000','#FE7D0B'], // Adjust as needed
            borderColor: '#FFFFFF', // Adjust as needed
            borderWidth: 1
        }]
      }
}