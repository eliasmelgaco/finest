"use client";

import React from "react";
import { Vector3 } from "three";
import { Text } from "@react-three/drei";
import CapLineSegment from "./CapLineSegment";
import LineSegment from "./LineSegment";
import { RoomsData } from "../page";

interface DimensionLineProps {
  room: RoomsData;
  index: number;
}

const DimensionsLine: React.FC<DimensionLineProps> = ({ room, index }) => {
  const shortenFactor = 1;
  const lineOffset = 0.2;
  const capLineOffset = 0.01;
  const yOffset = 0.00015;
  const color = "blue";

  const widthLineLength = room.size[0] * shortenFactor;
  const widthLineStart = new Vector3(
    room.position[0] - widthLineLength / 2,
    room.position[1] + yOffset,
    room.position[2] - room.size[1] / 2 + lineOffset
  );
  const widthEnd = new Vector3(
    room.position[0] + widthLineLength / 2,
    room.position[1] + yOffset,
    room.position[2] - room.size[1] / 2 + lineOffset
  );
  const widthCapLineLength = (room.size[0] - capLineOffset * 2) * shortenFactor;
  const widthCapLineStart = new Vector3(
    room.position[0] - widthCapLineLength / 2,
    room.position[1] + yOffset,
    room.position[2] - room.size[1] / 2 + lineOffset
  );
  const widthCapLineEnd = new Vector3(
    room.position[0] + widthCapLineLength / 2,
    room.position[1] + yOffset,
    room.position[2] - room.size[1] / 2 + lineOffset
  );

  // Length Line (Right of the Room)
  const lengthLineLength = room.size[1] * shortenFactor;
  const lengthLineStart = new Vector3(
    room.position[0] + room.size[0] / 2 - lineOffset,
    room.position[1] + yOffset,
    room.position[2] - lengthLineLength / 2
  );
  const lengthLineEnd = new Vector3(
    room.position[0] + room.size[0] / 2 - lineOffset,
    room.position[1] + yOffset,
    room.position[2] + lengthLineLength / 2
  );

  const lengthCapLineLength =
    (room.size[1] - capLineOffset * 2) * shortenFactor;
  const lengthCapLineStart = new Vector3(
    room.position[0] + room.size[0] / 2 - lineOffset,
    room.position[1] + yOffset,
    room.position[2] - lengthCapLineLength / 2
  );
  const lengthCapLineEnd = new Vector3(
    room.position[0] + room.size[0] / 2 - lineOffset,
    room.position[1] + yOffset,
    room.position[2] + lengthCapLineLength / 2
  );

  return (
    <>
      <>
        <LineSegment
          key={`width-line-${index}`}
          start={widthLineStart}
          end={widthEnd}
          color={color}
        />
        <CapLineSegment
          position={widthCapLineStart}
          rotation={[0, Math.PI / 2, 0]}
          color={color}
        />
        <CapLineSegment
          position={widthCapLineEnd}
          rotation={[0, Math.PI / 2, 0]}
          color={color}
        />

        {/* <TextWithBackground
          key={`length-label-${index}`}
          position={[
            (widthLineStart.x + widthEnd.x) / 2,
            room.position[1] + yOffset,
            (widthLineStart.z + widthLineStart.z) / 2.08,
          ]}
          rotation={new Euler(-Math.PI / 2, 0, 0)}
          text={room.size[0].toFixed(2)}
          color={color}
        /> */}
        <Text
          position={
            new Vector3(
              (widthLineStart.x + widthEnd.x) / 2,
              room.position[1] + yOffset,
              (widthLineStart.z + widthLineStart.z) / 2.08
            )
          }
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.1}
          color={color}
        >
          {`${room.size[0].toFixed(2)}m`}
        </Text>
      </>

      <>
        <LineSegment
          key={`length-line-${index}`}
          start={lengthLineStart}
          end={lengthLineEnd}
          color={color}
        />
        <CapLineSegment
          position={lengthCapLineStart}
          rotation={[0, 0, 0]}
          color={color}
        />
        <CapLineSegment
          position={lengthCapLineEnd}
          rotation={[0, 0, 0]}
          color={color}
        />

        {/* <TextWithBackground
          key={`length-label-${index}`}
          position={[
            (lengthLineStart.x + lengthLineEnd.x) / 2.19,
            room.position[1] + yOffset,
            (lengthLineStart.z + lengthLineEnd.z) / 2,
          ]}
          rotation={new Euler(-Math.PI / 2, 0, 1.57)}
          text={room.size[1].toFixed(2)}
          color={color}
        /> */}

        <Text
          key={`length-label-${index}`}
          position={
            new Vector3(
              (lengthLineStart.x + lengthLineEnd.x) / 2.19,
              room.position[1] + yOffset,
              (lengthLineStart.z + lengthLineEnd.z) / 2
            )
          }
          fontSize={0.1}
          rotation={[-Math.PI / 2, 0, 1.57]}
          color={color}
        >
          {`${room.size[1].toFixed(2)}m`}
        </Text>
      </>
    </>
  );
};

export default DimensionsLine;
