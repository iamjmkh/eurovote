import React from 'react';
import Nav from './Nav.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faBell } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <div className="ninety">
          <div id="hd_left">
            <h1>
              <a href="/">
                Eurovote{' '}
                <span className="yellow">
                  <FontAwesomeIcon icon={faMicrophone} width="32" />
                </span>
              </a>
            </h1>
          </div>
          <div id="hd_right">
            <Nav />
          </div>
        </div>
      </header>

      <div className="page-content">{children}</div>

      <div className="infoBanner">
        <p>
          <span className="yellow">
            <FontAwesomeIcon icon={faBell} />
          </span>
          {'   '} The information across our site is currently being added, so please bear with us whilst we get all 68
          contests up and live! {'   '}
          <span className="yellow">
            <FontAwesomeIcon icon={faBell} />
          </span>
        </p>
      </div>
      <footer>
        <h3>Eurovote</h3>
        <p className="footerSocial">
          <a href="https://twitter.com/EurovoteHQ" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>{' '}
        </p>
        <p>Copyright 2024 &copy; Eurovote</p>
        <p>hello@eurovote.uk</p>
        <br></br>
        <p className="small grey">Brought to you by JMKH Studios</p>
        <p className="small grey">Office 2814, 182-184 High Street North, East Ham, London E6 2JA</p>
      </footer>
    </div>
  );
}
