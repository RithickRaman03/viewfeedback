// import React, { useState, useEffect } from "react";
// import { FaStar } from "react-icons/fa";

// const Starating = ({ answer, size, marginLeft }) => {
//   const [filledStars, setFilledStars] = useState(0);

//   const colors = {
//     gold: "#FFD700",
//     grey: "#a9a9a9",
//   };

//   useEffect(() => {
//     const parsedAnswer = parseFloat(answer);
//     setFilledStars(Math.floor(parsedAnswer));
//   }, [answer]);

//   const renderStars = () => {
//     const starElements = [];

//     // Filled stars
//     for (let i = 0; i < 5; i++) {
//       starElements.push(
//         <FaStar
//           key={i}
//           size={size}
//           color={i < filledStars ? colors.gold : colors.grey}
//           style={{
//             marginTop: 15,
//             marginLeft: marginLeft,
//             cursor: "pointer",
//             justifyContent: "center",
//           }}
//         />
//       );
//     }

//     return starElements;
//   };

//   return <div id="svgContainer">{renderStars()}</div>;
// };

// export default Starating;

import React, { useState, useEffect } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

const Starating = ({ answer, size, marginLeft }) => {
  const [filledStars, setFilledStars] = useState(0);
  const [hasHalfStar, setHasHalfStar] = useState(false);

  const colors = {
    gold: "#FFD700",
    grey: "#a9a9a9",
  };

  useEffect(() => {
    const parsedAnswer = parseFloat(answer);
    const decimalPart = parsedAnswer % 1;

    setFilledStars(Math.floor(parsedAnswer));
    setHasHalfStar(decimalPart >= 0.1);
  }, [answer]);

  const renderStars = () => {
    const starElements = [];

    // Filled stars
    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        starElements.push(
          <FaStar
            key={i}
            size={size}
            color={colors.gold}
            style={{
              marginRight: 10,
              marginTop: 15,
              marginLeft: marginLeft,
              marginDown: 20,
              cursor: "pointer",
            }}
          />
        );
      } else if (i === filledStars && hasHalfStar) {
        starElements.push(
          <FaStarHalf
            key="half"
            size={size}
            color={colors.gold}
            style={{
              marginRight: 10,
              marginTop: 15,
              marginLeft: marginLeft,
              marginDown: 20,
              cursor: "pointer  ",
            }}
          />
        );
      } else {
        starElements.push(
          <FaStar
            key={i}
            size={size}
            color={colors.grey}
            style={{
              marginRight: 10,
              marginTop: 15,
              marginLeft: marginLeft,
              marginDown: 20,
              cursor: "pointer",
            }}
          />
        );
      }
    }

    return starElements;
  };

  return <div id="svgContainer">{renderStars()}</div>;
};

export default Starating;
