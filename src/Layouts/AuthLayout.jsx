import React from "react";
import PropTypes from "prop-types";
function AuthLayout({ children, title }) {
  return (
    <div className="auth-layout__container">
      <div className="auth-layout__card">
        {title && <h2 className="auth-layout__title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string, 
};

export default AuthLayout;
