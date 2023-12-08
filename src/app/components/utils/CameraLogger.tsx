"use client";

import { useEffect, MutableRefObject } from "react";

import { useThree } from "@react-three/fiber";

interface CameraLoggerProps {
  controlsRef: MutableRefObject<any>;
}

const CameraLogger: React.FC<CameraLoggerProps> = ({ controlsRef }) => {
  const { camera } = useThree();

  useEffect(() => {
    console.log(controlsRef);
    if (controlsRef?.current !== null) {
      const callback = () => console.log("Camera Position:", camera.position);

      const currentControls = controlsRef.current;
      currentControls.addEventListener("change", callback);

      return () => {
        currentControls.removeEventListener("change", callback);
      };
    }
  }, [camera, controlsRef]);

  return null;
};

export default CameraLogger;
