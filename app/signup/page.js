"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "./signup.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import WidthAlert from "../Components/WidthAlert";
import { LuUser } from "react-icons/lu";
import { HiViewfinderCircle } from "react-icons/hi2";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoIosMore } from "react-icons/io";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(Cookies.get("userToken" || null));
  const [windowWidth, setWindowWidth] = useState(1200);

  let router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://gamepad-api-09c0a7cf5370.herokuapp.com/signup",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        router.push("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token);
    }
  };

  return token ? (
    <Loader></Loader>
  ) : (
    <div>
      {windowWidth > 992 ? (
        <div className={styles.signup}>
          <Header></Header>
          <div className={styles.body}>
            <div className={styles.main}>
              <div className={styles.mainLeft}>
                <div className={styles.mainLeftBox}>
                  <p className={styles.h2}>How it works?</p>
                  <div className={styles.mainLeftLine}>
                    <div className={styles.lineLogo}>
                      <HiViewfinderCircle />
                    </div>
                    <p>
                      Check any infos you want about all the games existing{" "}
                    </p>
                  </div>

                  <div className={styles.mainLeftLine}>
                    <div className={styles.lineLogo}>
                      <LuUser />
                    </div>
                    <p>
                      Log in to your free account to be able to get all features
                    </p>
                  </div>
                  <div className={styles.mainLeftLine}>
                    <div className={styles.lineLogo}>
                      <MdOutlineBookmarkAdd />
                    </div>
                    <p>Add a game to your collection</p>
                  </div>
                  <div className={styles.mainLeftLine}>
                    <span className={styles.lineLogo}>
                      <IoIosMore />
                    </span>
                    <p>And more..</p>
                  </div>
                </div>
              </div>
              <div className={styles.mainRight}>
                <div className={styles.formBox}>
                  <p className={styles.h2}>Sign up</p>
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                      className={styles.input}
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <input
                      className={styles.input}
                      placeholder="Password.."
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <button className={styles.signupButton}>Signup</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <WidthAlert></WidthAlert>{" "}
        </div>
      )}
    </div>
  );
}
