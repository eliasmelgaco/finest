"use client";

import React from "react";
import { Vector3 } from "three";
import { Line } from "@react-three/drei";

interface LineSegmentProps {
  start: Vector3;
  end: Vector3;
  color?: string;
}

const LineSegment: React.FC<LineSegmentProps> = ({
  start,
  end,
  color = "black",
}) => {
  const calculateShortenedPoint = (start: Vector3, end: Vector3) => {
    const dx = end.x - start.x;
    const dz = end.z - start.z;
    return new Vector3(start.x + dx, start.y, start.z + dz);
  };

  const shortenedEnd = calculateShortenedPoint(start, end);

  return (
    <Line points={[start, shortenedEnd]} color={color} lineWidth={2} /> // Set the color and line width
  );
};

export default LineSegment;
