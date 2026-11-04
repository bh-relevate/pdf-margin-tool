import React from 'react';

function Banner({ status = 'info', children }) {
  return (
    <div className={`banner banner-${status}`} role={status === 'error' ? 'alert' : 'status'}>
      <span className="banner-dot" aria-hidden="true"></span>
      <span>{children}</span>
    </div>
  );
}

export default Banner;
