"use client";

import React, { Fragment, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Wall from "./components/Wall";
import FloorSection from "./components/FloorSection";
import RoomLabel from "./components/RoomLabel";
import DimensionsLine from "./components/DimensionsLine";
import Actions from "./components/Actions";
import CameraLogger from "./components/utils/CameraLogger";

// interface WallData {
//   position: [number, number, number];
//   size: [number, number, number];
// }
interface WallData {
  orientation: "horizontal" | "vertical";
  coordinates: [number, number, number];
  height: number;
  width: number;
  thickness: number;
  color: number;
}

export interface RoomsData {
  name: string;
  position: [number, number, number]; // `x`/2 is the horizontal position (left and right). `y` is the vertical position (up and down). `z`/2 is the depth position (forward and backward). The reason for dividing by 2 in the example is to position the object based on its center. In Three.js, when you specify the position of an object like a box or a plane, you're defining the position of its center. So, if you have a room that is 2.01 meters wide (along the x-axis) and 2.01 meters deep (along the z-axis), dividing these dimensions by 2 (2.01 / 2) gives you the position of the center of the room relative to its width and depth.
  size: [number, number]; // x, y
  color: number;
}

const wallsData: WallData[] = [
  // { position: [0, 1, 0], size: [4, 2, 0.1] },
  // { position: [2, 2.4 / 2, 2], size: [4, 2.4, 0.15] },
  {
    orientation: "horizontal",
    coordinates: [0, 0, 0],
    height: 2.4,
    width: 2.23,
    thickness: 0.07,
    color: 0xa9a9a9,
  },
  {
    orientation: "vertical",
    coordinates: [0, 0, -0.07],
    height: 2.4,
    width: 2.02,
    thickness: 0.2,
    color: 0x006400,
  },
  {
    orientation: "vertical",
    coordinates: [2.23 + 0.2, 0, 0.1],
    height: 2.4,
    width: 4.8,
    thickness: 0.2,
    color: 0xbdb76b,
  },
  {
    orientation: "vertical",
    coordinates: [2.23 + 0.07, 0, 0.1 + 4.8 + 0.775],
    height: 2.4,
    width: 1.895,
    thickness: 0.07,
    color: 0xf08080,
  },
  {
    orientation: "horizontal",
    coordinates: [-0.2, 0, 1.95 + 0.07],
    height: 2.4,
    width: 1,
    thickness: 0.07,
    color: 0xf08080,
  },
  {
    orientation: "horizontal",
    coordinates: [2.03, 0, 1.95 + 0.07],
    height: 2.4,
    width: 0.2,
    thickness: 0.07,
    color: 0xf08080,
  },
  {
    orientation: "vertical",
    coordinates: [0, 0, 2.02 + 0.07 - 0.07],
    height: 2.4,
    width: 1.95,
    thickness: 0.2,
    color: 0x8b008b,
  },
  {
    orientation: "horizontal",
    coordinates: [-0.2, 0, 1.95 + 0.07 + 1.95 + 0.07],
    height: 2.4,
    width: 0.2 + 1.08,
    thickness: 0.07,
    color: 0x7cfc00,
  },
  {
    orientation: "vertical",
    coordinates: [1.08 + 0.07, 0, 1.95 + 0.07 + 1.95],
    height: 2.4,
    width: 1.2,
    thickness: 0.07,
    color: 0xff00ff,
  },
  {
    orientation: "vertical",
    coordinates: [1.08 + 0.07, 0, 1.95 + 0.07 + 1.95 + 1.2 + 0.7],
    height: 2.4,
    width: 0.25,
    thickness: 0.07,
    color: 0xff00ff,
  },
  {
    orientation: "vertical",
    coordinates: [1.08 + 0.07, 0, 1.95 + 0.07 + 1.95 + 1.2 + 0.7 + 1.2],
    height: 2.4,
    width: 0.5,
    thickness: 0.07,
    color: 0xff00ff,
  },
  {
    orientation: "horizontal",
    coordinates: [-0.2, 0, 1.95 + 0.07 + 1.95 + 0.07 + 1.9 + 0.07],
    height: 2.4,
    width: 1.28,
    thickness: 0.07,
    color: 0x3cb371,
  },
  {
    orientation: "vertical",
    coordinates: [0, 0, 1.95 + 0.07 + 1.95 + 0.07],
    height: 2.4,
    width: 1.9,
    thickness: 0.2,
    color: 0x0000cd,
  },
  {
    orientation: "horizontal",
    coordinates: [1.08, 0, 1.95 + 0.07 + 1.95 + 0.07 + 1.9 + 0.07 + 1.63],
    height: 2.4,
    width: 1.22,
    thickness: 0.07,
    color: 0xffa07a,
  },
];

const roomsData: RoomsData[] = [
  {
    name: "Technical Area",
    position: [2.23 / 2, 0, 1.95 / 2], // Assuming starting from the origin
    size: [2.23, 1.95],
    color: 0xadd8e6,
  },
  {
    name: "Laundry",
    position: [2.23 / 2, 0, 1.95 + 1.95 / 2 + 0.07], // Positioned right after the technical area
    size: [2.23, 1.95],
    color: 0x90ee90,
  },
  {
    name: "Storage",
    position: [1.08 / 2, 0, 1.95 + 1.95 + 1.9 / 2 + 0.07 + 0.07], // Positioned right after the laundry
    size: [1.08, 1.9],
    color: 0xffffe0,
  },
  {
    name: "Corridor",
    position: [1.08 / 2 + 1.08 + 0.07, 0, 1.95 + 1.95 + 3.6 / 2 + 0.07], // Positioned right after the storage
    size: [1.08, 3.6],
    color: 0x00ffff,
  },
];

export default function Home() {
  const [showDimensions, setShowDimensions] = useState(false);
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [showWalls, setShowWalls] = useState(true);

  const controlsRef = useRef(null);

  return (
    <div className="w-full h-screen bg-gradient-to-r from-purple-700 to-purple-900 flex flex-col">
      <h1 className="text-white text-4xl font-bold p-5">Finest 1604 - Elias</h1>
      <div className="flex-grow">
        <div className="fixed top-24 left-5 z-50">
          <Actions
            showDimensions={showDimensions}
            showCoordinates={showCoordinates}
            showWalls={showWalls}
            setShowDimensions={setShowDimensions}
            setShowCoordinates={setShowCoordinates}
            setShowWalls={setShowWalls}
          />
        </div>

        <Canvas
          camera={{
            position: [1, 10, 0.24],
            fov: 30,
          }}
        >
          {/* <CameraLogger controlsRef={controlsRef} /> */}
          <ambientLight />
          <OrbitControls ref={controlsRef} />
          <pointLight position={[10, 10, 10]} />

          {roomsData.map((room, index) => {
            return (
              <Fragment key={index}>
                {showDimensions && <DimensionsLine room={room} index={index} />}
                {showCoordinates && (
                  <RoomLabel
                    position={room.position}
                    size={room.size}
                    text={`Room ${index + 1}`}
                  />
                )}

                <FloorSection
                  position={room.position}
                  size={room.size}
                  color={room.color}
                />
              </Fragment>
            );
          })}
          {showWalls &&
            wallsData.map((wall, index) => <Wall key={index} {...wall} />)}
        </Canvas>
      </div>
    </div>
  );
}
