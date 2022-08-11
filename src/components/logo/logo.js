import React from "react";
import Tilt from 'react-tilt';
import './logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
      <div className={'ma4 mt0'}>
          <Tilt className="Tilt br2 shadow-2 " options={{ max : 55 }} style={{ height: 170, width: 170 }} >
              <div className="Tilt-inner pa4"><img alt='logo' src={brain}/></div>
          </Tilt>
      </div>
    );
}

export default Logo;