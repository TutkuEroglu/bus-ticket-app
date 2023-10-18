import { useState, useEffect } from "react";
import useRouter from "next/router";
import Menu from "@/components/Menu";
import styles from "../../styles/payment.module.css";
import { sendMessage } from "../../components/Alerts";
import Loading from "../../components/Loading";
import { useUser } from "../../context/UserContext";

export default function PaymentPage() {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { getUser, isLoggedIn } = useUser();
  const router = useRouter();

  const handlePayment = () => {
    if (validatePaymentInfo()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setPaymentSuccess(true);
      }, 1000);
    } else {
      sendMessage({
        type: "error",
        title: "Lütfen geçerli kart bilgileri girin",
      });
    }
  };

  useEffect(() => {
    const isLogged = getUser();
    if (!isLogged || !isLoggedIn) {
      router.push("/login");
    } else {
      setUserLoggedIn(true);
    }
  }, [getUser, router, isLoggedIn]);

  const validatePaymentInfo = () => {
    const { cardNumber, expirationDate, cvv } = paymentInfo;

    if (
      cardNumber.length !== 16 ||
      cvv.length !== 3 ||
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate)
    ) {
      return false;
    }

    const [month, year] = expirationDate.split("/");
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (parseInt(year) < currentYear) {
      return false;
    }

    if (parseInt(year) === currentYear && parseInt(month) < currentMonth) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (paymentSuccess) {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [paymentSuccess, router]);

  return (
    <>
      {loading && (
        <div className={styles.loadingContainer}>
          <Loading type="spin" color="white" />
        </div>
      )}
      <div className={styles.paymentWrapper}>
        {userLoggedIn && (
          <div className={styles.paymentContainer}>
            <h1>Ödeme</h1>
            {paymentSuccess ? (
              <div className={styles.successMessage}>
                Ödeme başarıyla tamamlandı. Teşekkür ederiz!
              </div>
            ) : (
              <div className={styles.paymentInfo}>
                <input
                  type="text"
                  placeholder="Kart Numarası (16)"
                  value={paymentInfo.cardNumber}
                  className={styles.paymentInput}
                  onChange={(e) => {
                    const cardNumber = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 16);
                    setPaymentInfo({ ...paymentInfo, cardNumber });
                  }}
                />
                <input
                  type="text"
                  placeholder="Son Kullanma Tarihi (AA/YY)"
                  value={paymentInfo.expirationDate}
                  className={styles.paymentInput}
                  onChange={(e) => {
                    const expirationDate = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 4)
                      .replace(/(\d{2})(\d{2})/, "$1/$2");
                    setPaymentInfo({ ...paymentInfo, expirationDate });
                  }}
                />
                <input
                  type="text"
                  placeholder="CVV (3)"
                  value={paymentInfo.cvv}
                  className={styles.paymentInput}
                  onChange={(e) => {
                    const cvv = e.target.value.replace(/\D/g, "").slice(0, 3);
                    setPaymentInfo({ ...paymentInfo, cvv });
                  }}
                />
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className={styles.paymentButton}
                >
                  {loading ? "Ödeme Yapılıyor..." : "Ödeme Yap"}
                </button>
              </div>
            )}
            <Menu />
          </div>
        )}
        ;
      </div>
    </>
  );
}