import React, {useState} from "react";

export default function BlockButton({onClick, label}) {
  const [double, setDouble] = useState(false);
  return (
    <button
      disabled={double}
      onClick={() => {
        onClick();
        setDouble(true);
      }}
    >
      {label}
    </button>
  );
}
