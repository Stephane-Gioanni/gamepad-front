"use client";

import styles from "./cehess.module.css";
import { useState } from "react";
import { useEffect } from "react";

export default function Cehess() {
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // L'effet s'exécute une seule fois lors du montage du composant

  return windowWidth > 800 ? (
    <div>
      <p>windowWidth</p>
    </div>
  ) : (
    <div className={styles.container}>
      <p>hello</p>
    </div>
  );
}
