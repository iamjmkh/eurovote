import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  return (
    <div className="navigation">
      <p className="navMenuTitle">Menu</p>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={isNavExpanded ? 'navigationMenu expanded' : 'navigationMenu'}>
        <ul>
          <li className="homeNav">
            <a href="/">
              <FontAwesomeIcon icon={faHouse} />
            </a>
          </li>
          <li>
            <a href="/contests">Contests</a>
          </li>
          <li>
            <a href="/countries">Countries</a>
          </li>
          <li>
            <a href="/songs">Songs</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
