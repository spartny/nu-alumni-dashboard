import React from 'react';
import Navbar from './Navbar';
import "../css/entrepreneur.css"
import "../css/fonts.css"
import createGenderPieChart from '../Charts/ChartComponents/EntrepreneurCharts/entrepreneurGenderData';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import EntrepreneurGender from '../Charts/ChartComponents/EntrepreneurCharts/EntrepreneurGender';
import EntrepreneurGraduates from '../Charts/ChartComponents/EntrepreneurCharts/EntrepreneurGraduates';
import createEntrepreneurGraduatesBar from '../Charts/ChartComponents/EntrepreneurCharts/EntrepreneurGradYear'
import ExtendWindow from './ExtendWindow';
import { useAuthContext, u } from "../useAuthContext";
  import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import createDesignationsBar from '../Charts/ChartComponents/EntrepreneurCharts/entrepreneurDesignationsData';
import EntrepreneurDesignations from '../Charts/ChartComponents/EntrepreneurCharts/EntrepreneurDesignations';

export default function Alumni() {
  const [entrepreneur, setEntreprenuer] = useState([])
  const { user, loading } = useAuthContext()
  const [selectedYears, setSelectedYears] = useState([])


  const designationsData = createDesignationsBar(entrepreneur)
  const firstLoad = useRef(true)

  const genderData = createGenderPieChart(entrepreneur, selectedYears)
  const gradData = createEntrepreneurGraduatesBar(entrepreneur)

  useEffect(() => {
    if (firstLoad.current){
      firstLoad.current = false
    }
    else{
    setSelectedGraph(selectedGraph)
    }
    
    
  }, [genderData])
  


  const navigate = useNavigate()
  
  useEffect(() => {
    if (!loading && !user) navigate("/")
    getEntreprenuer();
  }, [user, navigate, loading])
  

  const handleGraphClick = (graphComponent) => {
    setSelectedGraph(graphComponent);
  }
  const [selectedGraph, setSelectedGraph] = useState(null);
  const getEntreprenuer = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/getEntrepreneur`)
    .then(entrepreneur => setEntreprenuer(entrepreneur.data))
    .catch(err => console.log(err));
  }

  function addToTable(){
    let tableArray = []
    for (var data in entrepreneur){
        tableArray.push([entrepreneur[data]['StudentName'], entrepreneur[data]['Company']])
    }
    return <table className='table-responsive table-bordered'>
        <tr>
            <th>Student</th>
            <th>Company</th>
        </tr>
    {tableArray.map((val, key) => {
            return (
                <tr key={key}>
                    <td>{val[0]}</td>
                    <td>{val[1]}</td>
                </tr>
            )
        })}
    </table>
}

  // const totalEntrepreneurs = () =>{
  //   let totalEntrepreneur = 0
  //   gradData.datasets[0].data.forEach(element => {
  //     totalEntrepreneur += element
  //   });
  //   return totalEntrepreneur
  // }


  

  return (
    <div>
    {loading ? (
        <Loading />
      ) : (
    <div className="flex flex-col min-h-screen bg-color scroll-y">
      <div className=' navbar  '>
        <Navbar selectedItem={'entrepreneurs'}/>
      </div>
      <div className='no-select entrepreneur-header'>
        <img src='nulogo_transparent.png' id='logo'></img>
        <h1>Alumni Dashboard</h1>
      </div>
      <div className="flex flex-wrap flexMargin" >
        <div className="flex flex-wrap">
          {selectedGraph && (
            <ExtendWindow setYears={setSelectedYears} gradData={gradData}  handleClose={() => setSelectedGraph(null)}>
              {selectedGraph}
            </ExtendWindow>
          )}
          <div className='w-full flex flex-wrap' id='row'>
            <div className="w-full lg:w-7/12 graph-size" id='bar-graph' onClick={() => handleGraphClick()}>
            <EntrepreneurDesignations designationsData={designationsData} />
            </div>
            <div className="w-full lg:w-4/12">
              <div className="w-full flex flex-wrap">
                <div className="w-2/3 graph-size" id='pie-chart' onClick={() => handleGraphClick(<EntrepreneurGender genderData={genderData} />)}>
                <EntrepreneurGender genderData={genderData} />
                </div>
                <div className="w-1/3">
                  <div className='entrepreneur-label animation'>
                  <p>{entrepreneur.length}</p>
                  <p>Entrepreneurs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-wrap" id='row'>
            <div className="w-full lg:w-1/3 graph-size" onClick={() => handleGraphClick()}>
            {addToTable()}
            </div>
            <div className="w-full lg:w-2/3 graph-size no-select" onClick={() => handleGraphClick(<EntrepreneurGraduates gradData={gradData}/>)}>
            <EntrepreneurGraduates gradData={gradData}/>
            </div>
          </div>
        </div>
      </div>
    </div>
      )}
  </div>
  );
}