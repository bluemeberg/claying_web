import React, { useState, useEffect } from "react";
import "./ProgressBar.css";
const ProgressBar = ({ value, max }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressValue = Math.ceil((value / max) * 100);
    setProgress(progressValue);
  }, [value, max]);

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
