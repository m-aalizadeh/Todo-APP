import React from "react";
import PropTypes from "prop-types";

const Visible = ({ when, otherwise, children }) => {
  return when ? <>{children}</> : <>{otherwise}</>;
};

Visible.propTypes = {
  when: PropTypes.bool,
  children: PropTypes.element,
  otherwise: PropTypes.element,
};

Visible.defaultProps = {
  when: false,
  children: null,
  otherwise: null,
};

export default Visible;
