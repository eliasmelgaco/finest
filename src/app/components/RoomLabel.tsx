"use client";

import { Text } from "@react-three/drei";

interface RoomLabelProps {
  position: [number, number, number];
  text: string;
  size: [number, number]; // Width, Depth of the room
}

const RoomLabel: React.FC<RoomLabelProps> = ({ position, text, size }) => {
  const cornerPositions = [
    [position[0] - size[0] / 2, position[1] + 0.001, position[2] - size[1] / 2], // Bottom left
    [position[0] + size[0] / 2, position[1] + 0.001, position[2] - size[1] / 2], // Bottom right
    [position[0] + size[0] / 2, position[1] + 0.001, position[2] + size[1] / 2], // Top right
    [position[0] - size[0] / 2, position[1] + 0.001, position[2] + size[1] / 2], // Top left
  ];

  return cornerPositions.map((corner, index) => (
    <Text
      key={index}
      position={corner as [number, number, number]}
      rotation={[-Math.PI / 2, 0, 0]} // Rotate to lie flat on the floor
      fontSize={0.1} // Adjust the font size as needed
      color="black"
      anchorX="center"
      anchorY="middle"
    >
      {`(${corner[0].toFixed(2)}, ${corner[1].toFixed(2)}, ${corner[2].toFixed(
        2
      )})`}
    </Text>
  ));
};

export default RoomLabel;
