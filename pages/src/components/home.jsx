import { useState } from "react";
import { useEffect } from "react";
import styles from "../styles/home.module.css";

function Home() {
  useEffect(() => {
    document.body.classList.add(styles.homepage);
    return () => {
      document.body.classList.remove(styles.homepage);
    };
  }, []);


  return (
    <div >
      <h1>Home Page</h1>
    </div>
  );
}

export default Home;
