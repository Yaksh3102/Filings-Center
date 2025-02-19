import React, { useState, useEffect } from "react";
import Image from "next/image";

const LoadingOverlay = () => {

  return (
      <div className="overlay">
        <Image
          src="/assets/logo.png" 
          width={150}
          height={150}
          alt="Loading"
          className="logo-overlay"
        />
      </div>
    )
};

export default LoadingOverlay;
