import React, { useState } from "react";

interface CardProps {
  image: string;
  name: string;
  role: string;
}

const Card: React.FC<CardProps> = ({ image, name, role }) => {
  const [flipped, setFlipped] = useState(false);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: 180, // 75% of 240
    height: 240, // 75% of 320
    borderRadius: 12, // ~75% of 16
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
    borderRadius: 16,
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
    padding: 16,
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
              padding: "12px 9px 9px 9px",
              zIndex: 1,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: 14 }}>{name}</div>
            <div style={{ fontSize: 11 }}>{role}</div>
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
