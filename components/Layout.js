import React from 'react';
import Nav from './Nav.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faBell } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <h1>
          <a href="/">
            Eurovote{' '}
            <span className="yellow">
              <FontAwesomeIcon icon={faMicrophone} width="32" />
            </span>
          </a>
        </h1>
        <Nav />
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
      </footer>
    </div>
  );
}
