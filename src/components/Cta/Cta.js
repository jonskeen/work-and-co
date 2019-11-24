import React from "react";
import PropTypes from "prop-types";
import { isFunction } from "helpers";

import styles from "./styles.module.css";


const Cta = ({ label, variant, disabled, onClick }) => {

  const combineClasses = () => {
    const variantClass = variant in styles ? styles[variant] : "";
    const disabledClass = disabled ? styles.disabled : "";

    return `${styles.cta} ${variantClass} ${disabledClass}`;
  };

  const ctaClassNames = combineClasses();

  const handleClick = event => {
    if (isFunction(onClick)) {
      onClick(event);
    }
  };

  return (
      <button className={ctaClassNames} onClick={handleClick} disabled={disabled}>
        {label}
      </button>
  );
};

Cta.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.oneOf([ "full", "halfLeft", "halfRight"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Cta;