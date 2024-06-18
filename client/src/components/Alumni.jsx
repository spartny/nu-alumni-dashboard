import React, { useRef, useState } from 'react';
import Navbar from './Navbar';
import "../css/alumni.css"
import "../css/fonts.css"
import createBarGraph from '../Charts/Country'
import createGenderPieChart from '../Charts/ChartComponents/EntrepreneurCharts/entrepreneurGenderData';
import createGraduatesBar, { gradDataForHighEd } from '../Charts/GraduatesPerYear';
import { useEffect } from "react";
import axios from "axios";
import { createHigherEdBar } from '../Charts/HigherEducation';
import GradGraph from '../Charts/ChartComponents/AlumniCharts/GradsGraph';
import GenderPie from '../Charts/ChartComponents/AlumniCharts/GenderPie';
import HigherEducation from '../Charts/ChartComponents/AlumniCharts/HigherEducation';
import WorldChoropleth from '../Charts/ChartComponents/AlumniCharts/WorldChoropleth';
import ExtendWindow from './ExtendWindow';
import { useAuthContext } from "../useAuthContext";
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import worldMap from '../assets/features.json'; // Import world map

export default function Alumni() {
  const { user, loading } = useAuthContext()

  const [alumni, setAlumni] = useState([])
  const [highEd, sethighEd] = useState([])
  const [selectedGraph, setSelectedGraph] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) navigate("/");

    getAlumni()
    getHigherEducation()
    
  }, [user, navigate, loading])

  const gradData = createGraduatesBar(alumni)
  let [selectedYears, setSelectedYears] = useState([])
  let genderData = createGenderPieChart(alumni, selectedYears)

  useEffect(() => {
    genderData = createGenderPieChart(alumni, selectedYears)

  }, [selectedYears])

  const firstLoad = useRef(true)
  
  console.log(gradData.labels)
  // selectedYears = gradData.labels
  console.log(selectedYears)

  const countryData = createBarGraph(alumni)


  useEffect(() => {
    if (firstLoad.current){
      firstLoad.current = false
    }
    else{
    setSelectedGraph(selectedGraph)
    }
    
    
  }, [genderData])
  
  

  function getAlumni() {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/getAlumni`)
      .then(alumni => setAlumni(alumni.data))
      .catch(err => console.log(err));
  }

  function getHigherEducation() {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/getHigherEducation`)
      .then(highEd => sethighEd(highEd.data))
      .catch(err => console.log(err));
  }

  const countryCounts = alumni.reduce((acc, item) => {
    const country = item.Country;
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  const choroData = [['Country', 'Number of Students']].concat(
    Object.entries(countryCounts)
  );

  

  const totalAlumni = () =>{
    let totalAlumni = 0
    gradData.datasets[0].data.forEach(element => {
      totalAlumni += element
    });
    return totalAlumni
  }

  const totalCompanies = () =>{
    let companies = new Set()
    alumni.forEach(element =>{
        companies.add(element.Company)
      }
    )
    return companies.size
  }

  const higherEdData = createHigherEdBar(highEd)

  const higherEdGradData = gradDataForHighEd(gradData, higherEdData)

  const handleGraphClick = (graphComponent) => {
    setSelectedGraph(graphComponent);
  }

  return (
    <div className="flex flex-col min-h-screen scroll-y bg-color">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col min-h-screen scroll-y">
        <div className='navbar'>
          <Navbar selectedItem={'alumni'}/>
        </div>
        <div className='no-select header'>
          <img src='nulogo_transparent.png' id='logo'></img>
          <h1>Alumni Dashboard</h1>
        </div>
        <div className="flex flex-wrap flexMargin scroll-y" >
          <div className="flex flex-wrap">
            {selectedGraph && (
              <ExtendWindow setYears={setSelectedYears} gradData={gradData} handleClose={() => setSelectedGraph(null)}>
                {selectedGraph}
              </ExtendWindow>
            )}
            <div className='w-full flex flex-wrap' id='top-row'>
              <div className="w-full lg:w-7/12 graph-size" id='bar-graph' onClick={() => handleGraphClick(<GradGraph gradData={gradData} />)}>
                <GradGraph gradData={gradData} />
              </div>
              <div className="w-full lg:w-4/12">
                <div className="w-full flex flex-wrap">
                  <div className="w-2/3 graph-size" id='pie-chart' onClick={() => handleGraphClick(<GenderPie genderData={genderData} />)}>
                    <GenderPie genderData={genderData} />
                  </div>
                  <div className="w-1/3">
                  <div className='label1 animation no-select'>
                    <p>{totalCompanies()}</p>
                    <p>Companies Reached</p>
                  </div>
                  <div className='label2 animation'>
                    <p>{ [...gradData.datasets[0].data].reverse()[0]}</p>
                    <p>Alumni in {[...gradData.labels].reverse()[0]}</p>
                    </div>
                    <div className='label3 animation'>
                      <p>{totalAlumni()}</p>
                      <p>Total Alumni</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-wrap" id='bottom-row'>
              <div id='bottom-row-graph' className="w-full lg:w-1/2 alumni-graph-size" onClick={() => handleGraphClick(<HigherEducation higherEdGradData={higherEdGradData} />)}>
                <HigherEducation higherEdGradData={higherEdGradData} />
                <p>Alumni Pursuing Higher Education vs Employed</p>
              </div>
              
              <div id='bottom-row-graph' className="w-full lg:w-1/2 alumni-graph-size no-select"  onClick={() => handleGraphClick(<WorldChoropleth countryData={countryData} choroData={choroData} worldMap={worldMap} />)}>
                <div className='chart-index'><WorldChoropleth countryData={countryData} choroData={choroData} worldMap={worldMap} /></div> 
                <p>Distribution of Alumni Across the World</p> 
              </div>
            </div>
          </div>
        </div>
        </div> 
    )}
    </div>
  );
}
