import { useState, useEffect } from "react";
import useRouter from "next/router";
import { useUser } from "../context/UserContext";
import styles from "../styles/home.module.css";
import { BusServicesInterface } from "../types";
import { sendMessage } from "../components/Alerts";
import Menu from "../components/Menu";

export default function HomePage() {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();
  const { getUser, isLoggedIn } = useUser();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [dataFind, setDataFind] = useState(true);

  useEffect(() => {
    const isLogged = getUser();
    if (!isLogged || !isLoggedIn) {
      router.push("/register");
    } else {
      setUserLoggedIn(true);
    }
  }, [getUser, router, isLoggedIn]);

  const handleSearch = () => {
    if (!departure || !arrival || !date) {
      sendMessage({ type: "error", title: "Lütfen tüm alanları doldurun" });
    } else if (!dataFind) {
      sendMessage({
        type: "error",
        title: "Aradığınız tarihe uygun sefer yok",
      });
    } else {
      router.push(
        `/search?departure=${departure}&arrival=${arrival}&date=${date}`
      );
    }
  };

  useEffect(() => {
    if (departure && arrival && date) {
      fetch("http://localhost:3000/api/search-by-date", {
        method: "POST",
        body: JSON.stringify({
          departure,
          arrival,
          date,
        }),
      })
        .then((response) => response.json())
        .then((data: BusServicesInterface[]) => {
          if (data.length > 0) {
            setDataFind(true);
          } else {
            setDataFind(false);
          }
        })
        .catch((error) => {
          sendMessage({
            type: "error",
            title: `Arama sonuçları alınırken hata oluştu: ${error}`,
          });
        });
    }
  }, [departure, arrival, date]);

  const today = new Date().toISOString().split("T")[0];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0];
    const inputYear = new Date(inputDate).getFullYear().toString();

    if (inputYear.length !== 4) {
      setDate(inputDate);
      return;
    }

    if (inputDate < currentDate) {
      setDate("");
      sendMessage({ type: "error", title: "Geçmiş bir tarih seçemezsin!" });
    } else {
      setDate(inputDate);
    }
  };

  return (
    <div className={styles.homeContainer}>
      {userLoggedIn && (
        <div className={styles.searchContainer}>
          <h1 className={styles.pageTitle}>Anasayfa</h1>
          <select
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className={styles.selectBox}
          >
            <option value="">Kalkış Yeri Seçin</option>
            <option value="Adana">Adana</option>
            <option value="Ankara">Ankara</option>
            <option value="Antalya">Antalya</option>
            <option value="Istanbul">Istanbul</option>
            <option value="Izmir">Izmir</option>
          </select>

          <select
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            className={styles.selectBox}
          >
            <option value="">Varış Yeri Seçin</option>
            <option value="Adana">Adana</option>
            <option value="Ankara">Ankara</option>
            <option value="Antalya">Antalya</option>
            <option value="Istanbul">Istanbul</option>
            <option value="Izmir">Izmir</option>
          </select>
          <input
            type="date"
            placeholder="Tarih"
            value={date}
            min={today}
            onChange={handleDateChange}
            className={styles.inputField}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            Ara
          </button>
        </div>
      )}
      <Menu />
    </div>
  );
}