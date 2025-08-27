import React from "react";

const DecorativeElements: React.FC = () => {
  return (
    <div className="fixed w-full h-dvh inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute top-20 left-10 w-32 h-32 opacity-10 rounded-full blur-xl"
        style={{ backgroundColor: "var(--color-secondary)" }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-48 h-48 opacity-30 rounded-full blur-xl"
        style={{ backgroundColor: "var(--color-accent)" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/3 w-24 h-24 opacity-10 rounded-full blur-lg"
        style={{ backgroundColor: "var(--color-primary)" }}
      ></div>
    </div>
  );
};

export default DecorativeElements;
