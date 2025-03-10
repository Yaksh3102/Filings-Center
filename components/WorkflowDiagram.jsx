import React from "react";
import { Container } from "react-bootstrap";

const WorkflowDiagram = ({ steps }) => {
  const colors = [
    "#FF6B6B", // Vibrant Red
    "#4ECDC4", // Turquoise
    "#45B7D1", // Sky Blue
    "#FFA07A", // Light Salmon
    "#98D8C8", // Mint
    "#F7DC6F", // Vibrant Yellow
    "#BB8FCE", // Light Purple
  ];

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const getCircleRadius = (text) =>
    Math.max(30, Math.min(8 * text.length, isMobile ? 60 : 80));

  const horizontalGap = isMobile ? 10 : 20;
  const verticalGap = isMobile ? 15 : 20;
  const maxRadius = Math.max(...steps.map((step) => getCircleRadius(step)));
  const svgWidth = steps.length * (maxRadius * 2 + horizontalGap);
  const svgHeight = maxRadius * 4 + verticalGap;

  const wrapText = (text, maxLength) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";
    words.forEach((word) => {
      if ((currentLine + word).length <= maxLength) {
        currentLine += (currentLine ? " " : "") + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });
    lines.push(currentLine);
    return lines;
  };

  return (
    <Container fluid className="overflow-x-auto">
      <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        <svg width={svgWidth} height={svgHeight} className="min-w-100">
          {steps.map((step, index) => {
            const radius = getCircleRadius(step);
            const x = index * (maxRadius * 2 + horizontalGap) + maxRadius;
            const y = index % 2 === 0 ? maxRadius : svgHeight - maxRadius;
            const color = colors[index % colors.length];
            const wrappedText = wrapText(step, isMobile ? 10 : 15);

            return (
              <g key={index}>
                {/* Circle with hover animation */}
                <circle
                  cx={x}
                  cy={y}
                  r={radius}
                  fill={color}
                  className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                  style={{
                    transform: "scale(1)",
                    transformOrigin: `${x}px ${y}px`,
                    transition: "all 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                  }}
                />

                {/* Number Label */}
                <text
                  x={x - radius + 5}
                  y={y - radius + (isMobile ? 35 : 40)}
                  fill="black"
                  fontSize={isMobile ? "30" : "45"}
                  fontWeight="bold"
                >
                  {index + 1}
                </text>

                {/* Text inside circle */}
                {wrappedText.map((line, lineIndex) => (
                  <text
                    key={lineIndex}
                    x={x}
                    y={y + (lineIndex - (wrappedText.length - 1) / 2) * (isMobile ? 15 : 20)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="black"
                    fontSize={isMobile ? "12" : "16"}
                    fontWeight="700"
                  >
                    {line}
                  </text>
                ))}

                {/* Custom Arrow Image */}
                {index < steps.length - 1 && (
                  <image
                    href="/assets/arrow.png"
                    x={x + (isMobile ? 70 : 90)}
                    y={index % 2 === 0 ? y : y - 40}
                    width={isMobile ? 80 : 100}
                    height={isMobile ? 40 : 60}
                    transform={`rotate(${index % 2 === 0 ? 45 : -45} ${
                      x + 50
                    } ${y})`}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </Container>
  );
};

export default WorkflowDiagram;
