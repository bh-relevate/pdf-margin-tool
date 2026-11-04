import React from 'react';

function Header() {
  return (
    <header className="top-nav">
      <div className="top-nav-heading">
        <span className="app-logo">
          <img src={`${process.env.PUBLIC_URL}/logo-mark.svg`} alt="" />
        </span>
        <span className="app-name">PDF Margin Tool</span>
      </div>
    </header>
  );
}

export default Header;
