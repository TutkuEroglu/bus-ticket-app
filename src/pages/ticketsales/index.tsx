import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { SearchResultsInterface } from "@/types";
import Menu from "@/components/Menu";
import styles from "../../styles/ticket-sales.module.css";
import { useUser } from "../../context/UserContext";
import { sendMessage } from "../../components/Alerts";

export async function getServerSideProps(context: any) {
  const id = context.query.id;
  const selectedBus = fetch(
    "http://localhost:3000/api/searchData?id=" + id
  ).then((response) => (response.json() as unknown) as SearchResultsInterface);
  return { props: selectedBus };
}

export default function TicketSalesPage(props: SearchResultsInterface) {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { getUser, isLoggedIn } = useUser();
  const router = useRouter();
  const selectedBus = props;

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedSeats]);

  useEffect(() => {
    const isLogged = getUser();
    if (!isLogged || !isLoggedIn) {
      router.push("/login");
    } else {
      setUserLoggedIn(true);
    }
  }, [getUser, router, isLoggedIn]);

  const handleSeatClick = (seatNumber: number) => {
    const userInfo = getUser();
    if (selectedSeats.length >= 5) {
      sendMessage({ type: "error", title: "En fazla 5 koltuk seçebilirsin" });
      
    }
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      const isEven = seatNumber % 2 == 0;
      const nearGender = selectedBus?.availableSeats.find((seat) =>
        isEven
          ? seat.seatNumber === seatNumber - 1
          : seat.seatNumber === seatNumber + 1
      );
      if (userInfo?.gender === "F" && nearGender?.gender === "M") {
        sendMessage({
          type: "error",
          title:
            "Yanınızdaki koltukta yalnızca sizinle aynı cinsiyette birisi oturabilir",
        });
        return;
      }
      if (userInfo?.gender === "M" && nearGender?.gender === "F") {
        sendMessage({
          type: "error",
          title:
            "Yanınızdaki koltukta yalnızca sizinle aynı cinsiyette birisi oturabilir",
        });
        return;
      }
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const calculateTotalPrice = () => {
    if (!selectedBus) {
      setTotalPrice(0);
      return;
    }

    const seatPrice = selectedBus.price;
    const totalPrice = seatPrice * selectedSeats.length;

    setTotalPrice(totalPrice);
  };

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      router.push(`/payment?seats=${selectedSeats.join(",")}`);
    } else {
      sendMessage({ type: "error", title: "Lütfen en az bir koltuk seçin" });
    }
  };

  const renderBusSeats = useMemo(() => {
    const userInfo = getUser();
    if (selectedBus?.availableSeats?.length) {
      const renderedSeats = [];
      for (let seatNumber = 1; seatNumber <= 20; seatNumber++) {
        const seat = selectedBus.availableSeats.find(
          (seat) => seat.seatNumber === seatNumber
        );
        if (seat) {
          renderedSeats.push(
            <div
              key={seat.seatNumber}
              className={`${styles["bus-seat"]} ${
                seat.gender === "M" ? styles["male"] : styles["female"]
              }`}
            >
              {seat.seatNumber}
            </div>
          );
        } else {
          if (selectedSeats.includes(seatNumber)) {
            renderedSeats.push(
              <div
                key={seatNumber}
                className={`${styles["bus-seat"]} ${
                  userInfo?.gender === "M" ? styles["male"] : styles["female"]
                } ${styles.selected}`}
                onClick={() => handleSeatClick(seatNumber)}
              >
                {seatNumber}
              </div>
            );
          } else {
            renderedSeats.push(
              <div
                key={seatNumber}
                className={styles["bus-seat"]}
                onClick={() => handleSeatClick(seatNumber)}
              >
                {seatNumber}
              </div>
            );
          }
        }
      }
      return renderedSeats;
    } else {
      return <></>;
    }
  }, [selectedBus, selectedSeats]);

  return (
    <div className={styles.ticketSalesContainer}>
      {userLoggedIn && (
        <>
          <h1 className={styles["title"]}>Bilet Satışı</h1>
          {selectedBus && (
            <>
              <h2 className={styles["sub-title"]}>Sefer Detayları</h2>
              <div className={styles.ticketInfoContainer}>
                <p>Sefer Adı: {selectedBus.busTrip}</p>
                <p>Kalkış Saati: {selectedBus.departureTime}</p>
                <p>Varış Saati: {selectedBus.arrivalTime}</p>
                <p>
                  Boş Koltuk Sayısı:{" "}
                  {selectedBus?.availableSeats?.length || "-"}
                </p>
                <p>Ücret: {selectedBus.price}</p>
              </div>
            </>
          )}
          {selectedBus && (
            <div className={`${styles["bus-layout"]} ${styles.busContainer}`}>
              {renderBusSeats}
            </div>
          )}
          <div className={styles["info"]}>
            <p>Seçilen Koltuklar: {selectedSeats.join(", ")}</p>
            <p className={styles.totalPrice}>Toplam Ücret: {totalPrice}₺</p>
          </div>
          <button
            className={styles["continue-button"]}
            onClick={handleContinue}
          >
            Devam
          </button>
          <Menu />
        </>
      )}
    </div>
  );
}