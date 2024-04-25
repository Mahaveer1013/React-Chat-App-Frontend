import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCircleInfo, faRightFromBracket, faGear, faEllipsisVertical, faStar } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../pages/Main';

export default function Header({username, isMyProfile}) {
    
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      // Move state update outside the async function
      auth.setLoading(true);
        let url = auth.url;
        const response = await fetch(`http://${url}:5000/api/logout`, {
        method: 'GET'
      });
      if (!response.ok) {
        auth.setFlash(['Backend Error', 'error']);
        throw new Error('failed to send data to backend');
      }
      localStorage.removeItem('token');
      auth.Logout();
    } catch (error) {
      console.log(error);
    }
    finally {
      // Move state update outside the async function
      auth.setLoading(false);
    }
  };
  // console.log(auth.userDet);

  
    return (<>
        <div className="header">
            <div className="chat--title">
                {username}
            </div>
            <div className="chat--options">
              {isMyProfile && 
                (<>
                <div className="chat-option">
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    </div>
                    <div className="chat-option" onClick={()=>(auth.setIsProfile(prev=>(!prev)))}>
                    <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
                    </div>
                    <div className="chat-option">
                    <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
                    </div>
                    <div className="chat-option">
                    <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                </div>
              </>)
              }
                <div className="chat-option logout-div" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
            </div>
        </div>
    </>)
}