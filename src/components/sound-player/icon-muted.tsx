import React from "react";

interface Props {
  theme: "light" | "dark";
}

const icon = ({ theme }: Props) => (
  <svg width="634px" height="467px" viewBox="0 0 634 467" version="1.1">
    <title>Group</title>
    <desc>Created with Sketch.</desc>
    <g
      id="Page-1"
      stroke="none"
      strokeWidth="1"
      fill={theme === "light" ? "#eee" : "#111111"}
      fillRule="evenodd"
    >
      <g id="Group" transform="translate(69.000000, 70.000000)">
        <g
          id="speaker"
          stroke={theme === "light" ? "#eee" : "#111111"}
          strokeWidth="33.3333333"
        >
          <polygon
            id="Path"
            fill={theme === "light" ? "#eee" : "#111111"}
            fillRule="nonzero"
            strokeLinejoin="round"
            points="222.593333 0.126666667 108.233333 99.04 0 99.04 0 226.326667 106.593333 226.326667 222.593333 326.666667"
          ></polygon>
          <path
            d="M280,92.3333333 C308.425359,135.64122 308.425359,191.692113 280,235 M327.333333,45 C379.344836,115.562387 379.344836,211.770947 327.333333,282.333333 M370.666667,1.66666667 C446.683196,96.2904798 446.683196,231.042854 370.666667,325.666667"
            id="Shape"
            strokeLinecap="round"
          ></path>
        </g>
        <line
          x1="0.5"
          y1="327.5"
          x2="495"
          y2="0"
          id="Line"
          stroke="#FF0000"
          strokeWidth="100"
          strokeLinecap="square"
        ></line>
      </g>
    </g>
  </svg>
);

export default icon;
