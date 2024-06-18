import React, {useEffect, useState} from 'react';
import Navbar from './Navbar';
import "../css/company.css"
import "../css/fonts.css"
import { useAuthContext } from "../useAuthContext";
import { useNavigate } from 'react-router-dom';
import Loading from "./Loading";
import axios from 'axios'

import CompanyHeatmap from '../Charts/ChartComponents/CompanyCharts/CompanyHeatmap';
import CompaniesList from '../Charts/ChartComponents/CompanyCharts/CompaniesList';

export default function Companies() {

  const { user, loading } = useAuthContext()
  const [companies, setCompanies] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/getCompanies`)
    .then((companies) => setCompanies(companies.data))
    .catch((error) => console.error(error))

    if (!loading && !user) navigate("/");
  }, [user, navigate, loading])

  let tempmax = 0;
  let companiesdata = [];
  const companyCounts = companies.reduce((acc, item) => {
    const company = item.Company;
    acc[company] = (acc[company] || 0) + 1;
    return acc;
  }, {});

  let allCompanies = JSON.parse(JSON.stringify(companyCounts));

  while (companiesdata.length != 16){ //no of companies
    for (var key in companyCounts){
      if (companyCounts[key] > tempmax){
        tempmax = companyCounts[key]
      }
    }
    let maxkey = Object.keys(companyCounts).find(maxkey => companyCounts[maxkey] === tempmax);
    companiesdata.push(maxkey)
    delete companyCounts[maxkey]
    tempmax = 0
  }

  const yearlycompanies = companies.reduce((acc, item) => {
    const year = item.GradYear;
    acc[year] = (acc[year] || [])
    if (companiesdata.includes(item.Company)){
      acc[year].push(item.Company)
      }
    return acc;
    }, {});


  return (
    <div>
    {loading ? (
        <Loading />
      ) : (
    <div className="flex flex-col min-h-screen bg-color no-select">
      <div className='navbar'>
        <Navbar selectedItem={'companies'}/>
      </div>
      <div className='no-select company-header'>
        <img src='nulogo_transparent.png' id='logo'></img>
        <h1>Alumni Dashboard</h1>
      </div>
      <div className="flex flex-wrap flexMargin scroll">
        <div className="w-full p-8">
          <div className="company-graph-size">
          <h1 className='heatmap-header {'>Heatmap of Top Companies of all time per Graduate Year</h1>
          <CompanyHeatmap companiesdata = {companiesdata} yearlycompanies = {yearlycompanies}/>
          <h1 className='heatmap-header'>Table of All Companies with the number of Alumni working in each</h1>
          <div style={{marginLeft: "28%", maxWidth: '37%'}}>
          
          <CompaniesList allCompanies = {allCompanies}/>
          </div>
          
          </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}