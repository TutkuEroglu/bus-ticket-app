import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../context/UserContext";
import styles from "../../styles/register.module.css";
import { sendMessage } from "../../components/Alerts";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const { register, getUser, isLoggedIn } = useUser();
  const router = useRouter();

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = getUser();
    if (loggedInUser && isLoggedIn) {
      setUserLoggedIn(true);
      router.push("/");
    }
  }, [getUser, router, isLoggedIn]);

  const handleBirthdateChange = (value: string) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    const minAgeDate = new Date();
    minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);

    if (selectedDate >= currentDate) {
      sendMessage({
        type: "error",
        title: "Geçerli bir doğum tarihi seçiniz.",
      });
      return;
    }

    if (selectedDate > minAgeDate) {
      sendMessage({
        type: "error",
        title: "Kayıt olmak için 18 yaşından büyük olmalısınız.",
      });
      return;
    }

    setBirthdate(value);
  };

  const minimumYear = 2003;

  const handleRegister = () => {
    const selectedDate = new Date(birthdate);
    const currentYear = new Date().getFullYear();

    if (
      username.length >= 4 &&
      email.includes("@") &&
      password.length >= 4 &&
      name.length >= 3 &&
      selectedDate.getFullYear() <= minimumYear &&
      selectedDate <=
        new Date(currentYear, new Date().getMonth(), new Date().getDate())
    ) {
      const newUser = {
        username,
        email,
        password,
        name,
        gender,
        birthdate,
      };

      register(newUser);
      router.push("/login");
    } else {
      sendMessage({
        type: "error",
        title: "Geçerli giriş bilgileri sağlanmadı.",
      });
    }
  };

  const handleLoginClick = () => {
    if (!userLoggedIn) {
      router.push("/login");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.registerHeader}>Kayıt Ol</h1>
      <input
        className={styles.registerInput}
        type="text"
        placeholder="Kullanıcı Adı (4)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={styles.registerInput}
        type="email"
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.registerInput}
        type="password"
        placeholder="Şifre (4)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className={styles.registerInput}
        type="text"
        placeholder="Ad (3)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        className={styles.registerInput}
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Cinsiyet Seçin</option>
        <option value="F">Kadın</option>
        <option value="M">Erkek</option>
      </select>
      <input
        className={styles.registerInput}
        type="date"
        placeholder="Doğum Tarihi"
        value={birthdate}
        onChange={(e) => handleBirthdateChange(e.target.value)}
      />
      <button className={styles.registerButton} onClick={handleRegister}>
        Kayıt Ol
      </button>
      <p className={styles.registerText}>
        Zaten üye misin? Giriş yapmak için{" "}
        <span className={styles.registerLink} onClick={handleLoginClick}>
          buraya tıkla
        </span>
        .
      </p>
    </div>
  );
}