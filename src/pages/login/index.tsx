import { useState, useEffect } from "react";
import useRouter from "next/router";
import { sendMessage } from "@/components/Alerts";
import { useUser } from "../../context/UserContext";
import styles from "../../styles/Login.module.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, getUser, isLoggedIn } = useUser();
  const router = useRouter();

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = getUser();
    if (loggedInUser && isLoggedIn) {
      setUserLoggedIn(true);
      router.push("/");
    }
  }, [getUser, router, isLoggedIn]);

  const handleLogin = () => {
    const registeredUser = getUser();
    if (
      registeredUser &&
      registeredUser.username === username &&
      registeredUser.password === password
    ) {
      login(registeredUser);
      router.push("/");
    } else {
      sendMessage({ type: "error", title: "Hatalı kullanıcı adı veya şifre." });
    }
  };

  const handleRegister = () => {
    if (!userLoggedIn) {
      router.push("/register");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginHeader}>Giriş Yap</h1>
      <input
        className={styles.loginUserName}
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={styles.loginPassword}
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.loginButton} onClick={handleLogin}>
        Giriş Yap
      </button>
      <p className={styles.registerLink}>
        Henüz kayıt değil misiniz?{" "}
        <a className={styles.registerHere} onClick={handleRegister}>
          Buraya{" "}
        </a>
        tıklayarak kayıt olabilirsiniz.
      </p>
    </div>
  );
}