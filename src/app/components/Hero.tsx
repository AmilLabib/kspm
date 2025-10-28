import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      style={{
        height: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        background: "#FFFFFF",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          width: "100%",
          height: "80vh",
          padding: "0 2rem",
          alignItems: "center",
        }}
      >
        {/* Left Side - Text */}
        <div
          style={{
            marginLeft: "10rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              color: "#252B42",
              fontWeight: "bold",
            }}
          >
            KSPM PKN STAN
          </h3>
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "0.5rem",
              color: "#252B42",
              fontWeight: "bold",
            }}
          >
            Rumah Riset
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#737373" }}>
            Divisi Riset Kelompok Studi Pasar Modal (KSPM)
          </p>
          <p style={{ fontSize: "1.25rem", color: "#737373" }}>PKN STAN</p>
        </div>
        {/* Right Side - GIF */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              width: "750px",
              height: "500px",
              maxWidth: "100%",
              maxHeight: "100%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/house.gif"
              alt="Hero Animation"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
