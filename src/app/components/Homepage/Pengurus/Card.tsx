import React, { useState } from "react";

interface CardProps {
  image: string;
  name: string;
  role: string;
  size?: number; // width in px (container width)
}

const Card: React.FC<CardProps> = ({ image, name, role, size = 180 }) => {
  const [flipped, setFlipped] = useState(false);

  // Derived sizes from base 'size' prop
  const containerWidth = size;
  const containerHeight = Math.round((size / 3) * 4); // keep 3:4 ratio (180 -> 240)
  const borderRadius = Math.round(size * 0.067); // ~12 for 180

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: containerWidth,
    height: containerHeight,
    borderRadius: borderRadius,
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    background: "#fff",
    perspective: 1000,
  };

  const flipperStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s cubic-bezier(.2,.8,.2,1)",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  const faceCommon: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    borderRadius: borderRadius,
    overflow: "hidden",
  };

  const frontStyle: React.CSSProperties = {
    ...faceCommon,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  };

  const backStyle: React.CSSProperties = {
    ...faceCommon,
    transform: "rotateY(180deg)",
    background: "#0f172a",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: Math.round(size * 0.089),
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
    transform: "scale(1)",
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div style={flipperStyle}>
        {/* Front */}
        <div style={frontStyle}>
          <img src={image} alt={name} style={imageStyle} />
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              padding: `${Math.round(size * 0.067)}px ${Math.round(
                size * 0.05
              )}px ${Math.round(size * 0.05)}px ${Math.round(size * 0.05)}px`,
              zIndex: 1,
              borderBottomLeftRadius: borderRadius,
              borderBottomRightRadius: borderRadius,
            }}
          >
            <div
              style={{ fontWeight: "bold", fontSize: Math.round(size * 0.078) }}
            >
              {name}
            </div>
            <div style={{ fontSize: Math.round(size * 0.06) }}>{role}</div>
          </div>
        </div>

        {/* Back */}
        <div style={backStyle}>
          <div style={{ textAlign: "center", lineHeight: 1.4 }}>
            <p style={{ margin: 0, fontWeight: 600, marginBottom: 6 }}>About</p>
            <p style={{ margin: 0, fontSize: 11 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
              risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
              nec, ultricies sed, dolor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
