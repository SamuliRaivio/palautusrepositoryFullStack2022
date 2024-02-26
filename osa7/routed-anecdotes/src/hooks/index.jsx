import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  };

  const inputProps = {
    type,
    value,
    onChange,
  };

  return {
    inputProps,
    reset,
  };
};

// moduulissa voi olla monta nimettyä eksportia
export const useAnotherHook = () => {
  // ...
};
