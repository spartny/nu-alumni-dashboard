import React, { useEffect, useState } from 'react';
import { MdClose } from "react-icons/md";
import "../css/fonts.css"
import "../css/extends.css"
import YearlyFilter from './YearlyFilter';
export default function ExtendWindow({ setYears, gradData, handleClose, children }) {
    const chartName = children.type.name;

    const [selectedYears, setSelectedYears] = useState([]);

    const years = gradData.labels // Generating years from 2013 to 2023
    // console.log(years)
    useEffect(() => {
        setYears(selectedYears)
    }, [setYears, selectedYears])
    return (
        <div className='flex extend-window'>
            <div className="w-2/3 p-4">
                <div onClick={handleClose} className='Mdclose-button'><MdClose /></div>
                <div className='extended-graph'>{children}</div>
            </div>

            <div className="w-1/3 p-4">
                <form>
                <div className='filter-item-align'>
                    <h2 className='h2-heading'>Filters:</h2>
                    <YearlyFilter years={years} selectedYears={selectedYears} setSelectedYears={setSelectedYears}/>
                    <button type='reset' onClick={()=> {setSelectedYears([])}}className='extendwindow-button extend-reset'>Clear</button>
                    <button type='sumbit'className='extendwindow-button extend-submit'>Apply</button>
                </div>
                </form>
            </div>
        </div>
    )
}
