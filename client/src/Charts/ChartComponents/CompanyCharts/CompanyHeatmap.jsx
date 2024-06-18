import React, { useState } from 'react';
import HeatMap from 'react-heatmap-grid';

export default function CompanyHeatmap(props) {
  const xLabels = Array.from({ length: 11 }, (_, i) => ` ${2013 + i}`);
  const yLabels = props.companiesdata;

  

  let heatmapdata = [];

  const generateHeatmapData = () => {
    heatmapdata = Array.from({ length: yLabels.length }, () =>
      Array.from({ length: 11 }, () => 0)
    );

    for (let year in props.yearlycompanies) {
      props.yearlycompanies[year].forEach((company) => {
        const companyIndex = yLabels.indexOf(company);
        if (companyIndex !== -1) {
          heatmapdata[companyIndex][parseInt(year) - 2013]++;
        }
      });
    }
  };

  generateHeatmapData();

  const [hoverCell, setHoverCell] = useState(null);

  const handleHover = (x, y, value) => {
    setHoverCell({ x, y, value });
  };

  const handleMouseLeave = () => {
    setHoverCell(null);
  };

  const data = Array.from({ length: yLabels.length }, () =>
    Array.from({ length: 11 }, () => Math.floor(Math.random() * 100))
  );

  return (
    <div style={{position: "relative",  width: '100%', height: '100%' }}>
      <HeatMap
        xLabels={xLabels}
        yLabels={yLabels}
        data={heatmapdata}
        xLabelsLocation="top"
        yLabelTextAlign = "center"
        yLabelWidth = "90"

        cellStyle={(background, value, min, max, data, x, y) => ({
          background: `rgb(231, 115, 24, ${1 - (max - value) * 0.85 / (max - min)})`,
          fontSize: '14px',
          color: '#000',
        })}
        cellRender={(value, x, y) => {
          return (
            <div
              style={{ position: 'relative', width: '100%', height: '100%' }}
              onMouseEnter={() => handleHover(x, y, value)}
              onMouseLeave={handleMouseLeave}
            >
              {value}
              {hoverCell && hoverCell.x === x && hoverCell.y === y && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    background: 'rgba(255,255,255,0.8)',
                    border: '1px solid #ccc'
                  }}
                >
                  Number of Alumni: {hoverCell.value}
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}