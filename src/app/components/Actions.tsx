"use client";

import React from "react";
import { Html } from "@react-three/drei";

interface ActionsProps {
  showDimensions: boolean;
  showCoordinates: boolean;
  showWalls: boolean;
  setShowDimensions: (show: boolean) => void;
  setShowCoordinates: (show: boolean) => void;
  setShowWalls: (show: boolean) => void;
}

const Actions: React.FC<ActionsProps> = ({
  showDimensions,
  showCoordinates,
  showWalls,
  setShowDimensions,
  setShowCoordinates,
  setShowWalls,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        onClick={() => setShowDimensions(!showDimensions)}
      >
        {showDimensions ? "Hide Dimensions" : "Show Dimensions"}
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        onClick={() => setShowCoordinates(!showCoordinates)}
      >
        {showCoordinates ? "Hide Coordinates" : "Show Coordinates"}
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        onClick={() => setShowWalls(!showWalls)}
      >
        {showWalls ? "Hide Walls" : "Show Walls"}
      </button>
    </div>
  );
};

export default Actions;
