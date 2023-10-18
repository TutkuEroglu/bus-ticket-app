import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { sendMessage } from "@/components/Alerts";
import Menu from "@/components/Menu";
import { BusServicesInterface } from "../../types";
import styles from "../../styles/search.module.css";
import { useUser } from "../../context/UserContext";

export default function SearchResultsPage() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const router = useRouter();
  const { departure, arrival, date } = router.query;
  const { getUser, isLoggedIn } = useUser();
  const [searchResults, setSearchResults] = useState<BusServicesInterface[]>(
    []
  );

  useEffect(() => {
    if (departure && arrival && date) {
      fetch("https://github.com/TutkuEroglu/bus-ticket-app/api/search-by-date", {
        method: "POST",
        body: JSON.stringify({
          departure,
          arrival,
          date,
        }),
      })
        .then((response) => response.json())
        .then((data: BusServicesInterface[]) => {
          setSearchResults(data);
        })
        .catch((error) => {
          sendMessage({
            type: "error",
            title: `Arama sonuçları alınırken hata oluştu: ${error}`,
          });
        });
    }
  }, [departure, arrival, date]);

  useEffect(() => {
    const isLogged = getUser();
    if (!isLogged || !isLoggedIn) {
      router.push("/login");
    } else {
      setUserLoggedIn(true);
    }
  }, [getUser, router, isLoggedIn]);

  const handleResultCardClick = (result: BusServicesInterface) => {
    router.push(`/ticketsales?id=${result.id}`);
  };

  return (
    <div className={styles.searchResults}>
      {userLoggedIn && (
        <>
          <h1 className={styles.resultsTitle}>Arama Sonuçları</h1>
          <div className={styles.searchInfoContainer}>
            <p className={styles.searchInfo}>Kalkış Yeri: {departure}</p>
            <p className={styles.searchInfo}>Varış Yeri: {arrival}</p>
            <p className={styles.searchInfo}>Tarih: {date}</p>
          </div>
          <ul className={styles.resultsList}>
            {searchResults.map((result) => (
              <li
                className={styles.resultCard}
                key={result.id}
                onClick={() => handleResultCardClick(result)}
              >
                <div className={styles.resultInfoHeader}>
                  <p className={styles.resultInfo}>
                    Kalkış Yeri: {result.departureLocation}
                  </p>
                  <p className={styles.resultInfo}>
                    Varış Yeri: {result.arrivalLocation}
                  </p>
                  <p className={styles.resultInfo}>Tarih: {result.date}</p>
                </div>
                <div className={styles.resultInfoContainer}>
                  <p className={styles.resultInfo}>
                    Boş Koltuklar: {result.availableSeats?.length || 0}
                  </p>
                  <p className={styles.resultInfo}>Fiyat: {result.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <Menu />
        </>
      )}
    </div>
  );
}