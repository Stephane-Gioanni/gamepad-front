"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "./login.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import Header from "../Components/Header";
import WidthAlert from "../Components/WidthAlert";
import { LuUser } from "react-icons/lu";
import { HiViewfinderCircle } from "react-icons/hi2";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoIosMore } from "react-icons/io";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(Cookies.get("userToken" || null));
  const [windowWidth, setWindowWidth] = useState(1200);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://gamepad-api-09c0a7cf5370.herokuapp.com/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        Cookies.set("userCollection", JSON.stringify(response.data.favorites));
        router.push("/");
      } else {
        alert("Wrong email or wrong password");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token);
    } else {
      Cookies.remove("userToken");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return token ? (
    <div>
      <span>Déjà connecté</span>
      <Link href="/">
        <span>Retour home</span>{" "}
      </Link>
    </div>
  ) : (
    <div>
      {windowWidth > 992 ? (
        <div className={styles.login}>
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
                <form className={styles.formBox} onSubmit={handleSubmit}>
                  <p className={styles.h2}>Login</p>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <button className={styles.loginButton} type="submit">
                    Connect
                  </button>
                  <Link href="/signup">
                    <div className={styles.noAccount}>
                      Dont have an account yet?
                    </div>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <WidthAlert></WidthAlert>
        </div>
      )}
    </div>
  );
}
