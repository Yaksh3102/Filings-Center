import React from "react";
import Image from "next/image";

const LoadingOverlay = () => {

  return (
      <div className="overlay">
        <Image
          src="/assets/overlay-filing-centre-logo.png" 
          width={300}
          height={300}
          alt="Loading"
          className="logo-overlay"
        />
      </div>
    )
};

export default LoadingOverlay;
