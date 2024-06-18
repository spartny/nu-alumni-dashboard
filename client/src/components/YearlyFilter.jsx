import React, { useEffect, useRef, useState } from 'react';

const YearlyFilter = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const firstLoad = useRef(true)

  let yearsList = props.years;

  const toggleList = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    
  };

  useEffect(() => {  
      yearsList = ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
      props.setSelectedYears(yearsList);
      console.log(yearsList)
      
  }, [])  

  const handleYearClick = (year) => {
    console.log(document.getElementById("yearFilter").children)
    for (let i = 0; i < document.getElementById("yearFilter").children.length; i++) {
      
    }
    if (props.selectedYears.includes(year)) {
      props.setSelectedYears(props.selectedYears.filter(y => y !== year));
    } else {
      props.setSelectedYears([...props.selectedYears, year]);
    }
  };

  return (
    <div className="filter">
      <button className="filter-button" onClick={toggleList}>Filter by Year &#9660;
      </button> 
      {isOpen && (
        <ul id="yearFilter" className="year-list">
          {yearsList.map(year => (
            <li key={year}
             onClick={() => handleYearClick(year)}
             >
              <input
                id={year}
                type="checkbox"
                value={year}
                checked={props.selectedYears.includes(year)}
                defaultChecked
              />
              <label>{year}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YearlyFilter;
