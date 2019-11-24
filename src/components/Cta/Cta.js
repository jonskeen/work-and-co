import React from "react";
import PropTypes from "prop-types";
import { isFunction } from "helpers";

import styles from "./styles.module.css";


const Cta = ({ label, ariaLabel, variant, disabled, fullWidth, onClick }) => {

  const combineClasses = () => {
    const variantClass = variant in styles ? styles[variant] : "";
    const disabledClass = disabled ? styles.disabled : "";
    const fullWidthClass = fullWidth ? styles.fullWidth : "";

    return `${styles.cta} ${variantClass} ${disabledClass} ${fullWidthClass}`;
  };

  const ctaClassNames = combineClasses();

  const handleClick = event => {
    if (isFunction(onClick)) {
      onClick(event);
    }
  };

  return (
      <button
          className={ctaClassNames}
          onClick={handleClick}
          disabled={disabled}
          aria-label={ariaLabel}
      >
        {label}
      </button>
  );
};

Cta.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.oneOf([ "oval", "rectangle" ]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func
};

Cta.defaultProps = {
  variant: "oval"
};

export default Cta;