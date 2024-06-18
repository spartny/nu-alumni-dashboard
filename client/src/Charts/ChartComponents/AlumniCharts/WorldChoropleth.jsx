// import React, { useEffect, useState } from "react";
// import { csv } from "d3-fetch";
// import { scaleLinear } from "d3-scale";
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   Sphere,
//   Graticule
// } from "react-simple-maps";

// const geoUrl = "../../../assets/features.json";

// const colorScale = scaleLinear()
//   .domain([0.29, 0.68])
//   .range(["#ffedea", "#ff5233"]);

// const MapChart = () => {
//   const [data, setData] = useState([]);

//   // useEffect(() => {
//   //   csv(`/vulnerability.csv`).then((data) => {
//   //     setData(data);
//   //   });
//   // }, []);

//   return (
//     <ComposableMap
//       projectionConfig={{
//         rotate: [-10, 0, 0],
//         scale: 147
//       }}
//     >
//       {/* <Sphere stroke="#E4E5E6" strokeWidth={0.5} /> */}
//       <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
//       {data.length > 0 && (
//         <Geographies geography={geoUrl}>
//           {({ geographies }) =>
//             geographies.map((geo) => {
//               const d = data.find((s) => s.ISO3 === geo.id);
//               return (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
//                 />
//               );
//             })
//           }
//         </Geographies>
//       )}
//     </ComposableMap>
//   );
// };

// export default MapChart;


// import React from 'react'
// import Chart from 'react-google-charts';

// export default function WorldCoropleth(props) {
//   return (
//     // <div 
//     // style={{marginLeft:"30%"}}
//     // >
//         <Chart
//               chartEvents={[
//                 {
//                   eventName: "select",
//                   callback: ({ chartWrapper }) => {
//                     const chart = chartWrapper.getChart();
//                     const selection = chart.getSelection();
//                     if (selection.length === 0) return;
//                     const region = props.countryData[selection[0].row + 1];
//                     console.log("Selected : " + region);
//                   },
//                 },
//               ]}
              
//               chartType="GeoChart"
//               width="80%"
//               // height="100%"
//               data={props.choroData}
//               options={{
//                 title: "GeoChart",
//                 colorAxis: { colors: ['#f0f8ff', '#add8e6', '#87ceeb', '#4682b4', '#000080'] },
//                 'legend': false
//               }}
//           />
//     // </div>
//   )
// }






import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear, scaleLog, scaleQuantile, scaleThreshold } from "d3-scale";
import './worldChoropleth.css'
import { useState } from 'react';
import { text } from '@fortawesome/fontawesome-svg-core';
export default function WorldChoropleth(props) {
  const [boxes, setBoxes] = useState([]);
  const [tooltipPosition, setTooltipPosition] = useState([0, 0])
  props.choroData.forEach(country => {
    if (country[0] === "US"){
      country[0] = 'United States';
    }
  });
  const colorScale = scaleLog([1, 600], ['#e77318', "#5d0204"])
  // const colorScale = scaleQuantile().domain([0, 100]).range(['#B64E16', '#9F0404' , '#770303', "#5d0204"])
  
  function hideTooltip(){
    console.log("left")
    // document.getElementById('tooltip').innerHTML = ``
    // document.getElementById('tooltip').style = {"visibility": "hidden", "top": tooltipPosition[1], "left": tooltipPosition[0] }

  } 

  function showToolTip(country, number, e){
    console.log(country, number)
    if (country === undefined && number === undefined){
      console.log("showToolTip")
      document.getElementById('tooltip').innerHTML = ``
      // document.getElementById('tooltip').style = {"visibility": "hidden", "z-index":-2 ,"top": tooltipPosition[1], "left": tooltipPosition[0]}
    }
    else{
      // document.getElementById('tooltip').style = {"visibility": "visible", "top": tooltipPosition[1], "left": tooltipPosition[0]}
      console.log("hovering on - " + JSON.stringify(country) + "with " + number)
      console.log(e.pageX, e.pageY)
      const tooltip = document.getElementById('tooltip')
      setTooltipPosition([e.pageX, e.pageY])
      // tooltip.style.top = e.pageX
      // tooltip.style.left = e.pageY
      tooltip.innerHTML = `<span class="tooltiptext">` + country + " - " + number +`</span>`
    }
   
    
  }
  
  return (
    <div>
      <ComposableMap onMouseEnter={() => {
        document.getElementById('tooltip').innerHTML = ``
      }} projection="geoMercator" width={400} height={160}
      projectionConfig={{
        rotate: [0, 0, 0],
        center: [0, 25],
        scale: 50
      }}>
        <Geographies geography={props.worldMap}>
          {({ geographies}) =>

            geographies.map((geo) => 
              {
                let d = ''
                // console.log(d)
                
                props.choroData.forEach(country => {
                  if (country[0] === geo.properties.name){
                    d = [country[0], country[1]]
                  }
                });
                return(
                  <Geography className='tooltip' key={geo.rsmKey} geography={geo}
                  onMouseEnter={(e) => {
                    console.log(geo)
                    showToolTip(d[0], d[1], e)}}
                  onMouseOut={(e) => {hideTooltip()}}
                  color={"white"} 
                  fill={d ? colorScale(d[1]) : "lightGrey"}
                  style={{
                    default: {
                        outline: 'none'
                    },
                    hover: {
                        outline: 'none'
                    },
                    pressed: {
                        outline: 'none'
                    }
                }}
                  
               />
                )
              }
            )
            
          }
        </Geographies>
      </ComposableMap>
     
     <div className="tooltip" id="tooltip" style={{ "transition":'500ms', "position": "absolute", "top": tooltipPosition[1] - 60, "left": tooltipPosition[0] - 50}}>

     </div>
    </div>
    // <div style={{ width: "100%", height: "500px"}}>
      // <ComposableMap projection="geoEqualEarth" projectionConfig={{rotate: [-10, 0, 0],
      //   scale: 147}}>
      //   <Geographies geography={worldMap}>
      //     {({ geographies }) => 
          
      //     {
      //           geographies.map((geo) => {
      //           console.log("geo:", geo);
      //           // const country = props.countryData.find((d) => d[0] === geo.properties.NAME);
      //           // console.log("country:", country);
      //           let fillColor = '#F5F4F6'; // Default fill color
      //           // if (country) {
      //           //   const value = country[1]; // Assuming data is in the format [Country, Value]
      //           //   // Adjust the range of shades of red based on your data values
      //           //   fillColor = `rgb(${255 - value * 5}, 0, 0)`; // Adjust the calculation for shades of red
      //           // }
      //           return (
      //             <Geography
      //               key={geo.rsmKey}
      //               geography={geo}
      //               fill={fillColor}
      //               onMouseEnter={() => {
      //                 const { NAME } = geo.properties;
      //                 console.log('Country: ', NAME);
      //               }}
      //             />
      //           );
      //         })}
      //     }
      //   </Geographies>
      // </ComposableMap>
    // </div>
  );
}


