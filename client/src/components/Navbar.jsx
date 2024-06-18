import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBars, faBuilding, faUserTie, faUserEdit,faSignOutAlt,faUserPlus } from '@fortawesome/free-solid-svg-icons';
import "../css/navbar.css";
import "../css/fonts.css"
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../useAuthContext";
import axios from 'axios';

export default function Navbar(props) {
  const { user, dispatch } = useAuthContext();


  useEffect(() => {
    if (user && user.token) {
          axios.post(`${process.env.REACT_APP_SERVER_URL}/tokendecode`, {token: user.token})
          .then(result =>{
            setIsAdmin(result.data.admin);
          }).catch (error => console.log(error))
    }
  }, [user]);



  const Navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const selectedItem = props.selectedItem;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  

  const handleItemClick = (item) => {
    switch(item) {
      case 'alumni':
        Navigate('/alumni');
        break;
      case 'companies':
        Navigate('/companies');
        break;
      case 'entrepreneurs':
        Navigate('/entrepreneurs');
        break;
      case 'addData':
        Navigate('/addData');
        break;
      case 'createUser':
        Navigate('/createUser');
        break;     
      case 'logout':
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        Navigate('/');
        break;
    }  
  };
  
  return (
    
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div onClick={toggleSidebar} className='toggle-margin no-select'>

          {sidebarOpen ? (
            <div className="btn">
              <FontAwesomeIcon icon={faBars}  />
              <span className="menu-text">Menu</span>
            </div>
          ) : (
            <div>
            <FontAwesomeIcon icon={faBars} className="menu-btn" />
            <br></br>
            </div>
          )}
        </div>

        <div onClick={() => handleItemClick('alumni')} className={selectedItem === 'alumni' ? 'selected' : ''}>
          {sidebarOpen ? (
            <div className="btn no-select" >
              <FontAwesomeIcon icon={faGraduationCap} />
              <span className="menu-text">Alumni</span>
            </div>
          ) : (
              <FontAwesomeIcon icon={faGraduationCap} className="menu-btn" />
            
          )}
        </div>

        <div onClick={() => handleItemClick('companies')} className={selectedItem === 'companies' ? 'selected' : ''}>
          {sidebarOpen ? (
            <div className="btn no-select">
              <FontAwesomeIcon icon={faBuilding} />
              <span className="menu-text">Companies</span>
            </div>
          ) : (
            <FontAwesomeIcon icon={faBuilding} className="menu-btn"/>
          )}
        </div>

        <div onClick={() => handleItemClick('entrepreneurs')} className={selectedItem === 'entrepreneurs' ? 'selected' : ''}>
          {sidebarOpen ? (
            <div className="btn no-select">
              <FontAwesomeIcon icon={faUserTie} />
              <span className="menu-text">Entrepreneurs</span>
            </div>
          ) : (
            <FontAwesomeIcon icon={faUserTie} className="menu-btn"/>
          )}
        </div>

        <div onClick={() => handleItemClick('addData')} className={selectedItem === 'addData' ? 'selected' : ''}>
          {isAdmin &&
          (sidebarOpen ? (
            <div className="btn no-select">
              <FontAwesomeIcon icon={faUserEdit} />
              <span className="menu-text">Add Data</span>
            </div>
          ) : (
            <FontAwesomeIcon icon={faUserEdit} className="menu-btn"/>
          )
        )}
        

        </div>
        <div onClick={() => handleItemClick('createUser')} className={selectedItem === 'createUser' ? 'selected' : ''}>
        {isAdmin &&
          (sidebarOpen ? (
            <div className="btn no-select">
              <FontAwesomeIcon icon={faUserPlus} />
              <span className="menu-text">Create User</span>
            </div>
          ) : (
            <FontAwesomeIcon icon={faUserPlus} className="menu-btn"/>
          )
        )}
        </div>

        <div>
        <div onClick={() => handleItemClick('logout')}>
          {sidebarOpen ? (
            <div className="btn no-select logout-margin" onClick={() => handleItemClick('logout')}>
              <FontAwesomeIcon icon={faSignOutAlt}   />
              <span className="menu-text">Logout</span>
            </div>
          ) : (
            <div onClick={() => handleItemClick('logout')}>
              <FontAwesomeIcon icon={faSignOutAlt} className="menu-btn closed-logout-margin"/>
            </div>
            
          )}
        </div>
      </div>
      </aside>
  );
}
