import React, { useState } from 'react';

export default function CompaniesList(props) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredCompanies = Object.entries(props.allCompanies).filter(([companyName, _]) => {
        return companyName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    filteredCompanies.sort((a, b) => b[1] - a[1]);

    return (
        <div>
            <div className='table-row'>
                <h2>Search for a Specific Company</h2>
                <input className="search-box" type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search companies" />
            </div>
            <table className='table-responsive table-bordered'>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Number of working alumni</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCompanies.map(([companyName, numAlumni]) => (
                        <tr key={companyName}>
                            <td>{companyName}</td>
                            <td>{numAlumni}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
