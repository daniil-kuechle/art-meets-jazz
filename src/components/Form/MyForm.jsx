import { useState } from "react";
import styles from "./Form.module.css";

export default function BasicForm({ handleSetIsOpen }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    fetch("https://formcarry.com/s/AKG3HM3ZLA-", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code === 200) {
          // alert("We received your submission, thank you!");
          handleSetIsOpen(
            `Thank you for your inquiry, we'll respond as soon as possible.`
          );
        } else if (response.code === 422) {
          // Field validation failed
          handleSetIsOpen(`There was an error ${response.message}`);
          setError(response.message);
        } else {
          // other error from formcarry
          handleSetIsOpen(`There was an error ${response.message}`);
          setError(response.message);
        }
      })
      .catch((error) => {
        // request related error.
        setError(error.message ? error.message : error);
      });
  }

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className={styles["formcarry-container"]}>
          <label htmlFor="name">Full Name</label>
          <input
            style={{ backgroundColor: "#585858" }}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Your first and last name"
          />
        </div>

        <div className={styles["formcarry-container"]}>
          <label htmlFor="email">Your Email Address</label>
          <input
            style={{ backgroundColor: "#585858" }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="miles@davis.com"
          />
        </div>

        <div className={styles["formcarry-container"]}>
          <label htmlFor="message">Your message</label>
          <textarea
            style={{ backgroundColor: "#585858" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            placeholder="Tell us which painting you're interested in.."
          ></textarea>
        </div>

        <div className={styles["formcarry-container"]}>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}
