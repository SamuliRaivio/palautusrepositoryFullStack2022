import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisibleTrue = { display: visible ? "none" : "" };

  const showWhenVisibleTrue = { display: visible ? "" : "none" };

  const changeVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { changeVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisibleTrue}>
        <button onClick={changeVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisibleTrue}>
        {props.children}
        <button onClick={changeVisibility}>cancel</button>
      </div>
    </div>
  );
});

//määritellään propsit pakollisiksi
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
