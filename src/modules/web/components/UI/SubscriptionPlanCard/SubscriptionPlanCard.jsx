import React from "react";
import styles from "./SubscriptionPlanCard.module.css";
import CustomButton from "../Button/Button";

const SubscriptionPlanCard = (props) => {
  const { handlePlanAction, data } = props;
  function formatNumber(number) {
    return number.toLocaleString("en-IN");
  }

  return (
    <div className={styles.cardWrapper}>
      <article className={styles.card}>
        <header className={styles.header}>
          <h2 className={styles.planTitle}>{data.name}</h2>
          {data.is_recommended && (
            <span className={styles.recommended}>Recommended</span>
          )}
        </header>

        <div className={styles.priceSection}>
          <span className={styles.price}>₹{formatNumber(data.price)}</span>
          <span className={styles.perMonth}>/ {data.type}</span>
        </div>

        {/* <p className={styles.description}>
          Turn screen time into story time – personalized, educational, and
          fun...
        </p> */}

        <hr className={styles.divider} />

        <section className={styles.benefits}>
          <h4 className={styles.benefitsTitle}>Benefits:</h4>
          <ul>
            {data.benefits.map((item) => {
              return <li>{item}</li>;
            })}
          </ul>
        </section>

        <footer className={styles.footer}>
          {/* <button className={styles.actionBtn}>
                        Downgrade Plan <span className={styles.arrow}>→</span>
                    </button> */}
          <CustomButton
            variant="contained"
            customColor="#131313"
            custmstyle={{
              // padding: "10px 15px",
              position: "relative",
              background: `
              linear-gradient(180deg, #fff47a 0%, #ffd500 50%, #f2c200 100%),
              radial-gradient(ellipse at center bottom, #fff 15%, transparent 60%)
            `,
              backgroundBlendMode: "screen",
              color: "#1a1a1a",
              fontWeight: 600,
              fontSize: "16px",
              border: "none",
              borderRadius: "24px",
              padding: "8px 24px",
              width: "100%",
              height: "40px",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
            }}
            onClick={() => handlePlanAction(data.id)}
          >
            Buy Plan <span className={styles.arrow}>→</span>
          </CustomButton>
        </footer>
      </article>
    </div>
  );
};

export default SubscriptionPlanCard;
