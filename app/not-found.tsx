
import Link from 'next/link'
import styles from "./components/not-found.module.css"

export default function NotFound() {
  return (
    <main className="bg-gray-900">
      <header className={styles["top-header"]}>
      </header>

      <div>
        <div className={styles["starsec"]}></div>
        <div className={styles["starthird"]}></div>
        <div className={styles["starfourth"]}></div>
        <div className={styles["starfifth"]}></div>
      </div>

      <div className={styles["lamp__wrap"]}>
        <div className={styles["lamp"]}>
          <div className={styles["cable"]}></div>
          <div className={styles["cover"]}></div>
          <div className={styles["in-cover"]}>
            <div className={styles["bulb"]}></div>
          </div>
          <div className={styles["light"]}></div>
        </div>
      </div>

      <section className={styles["error"]}>
        <div className={styles["error__content"]}>
          <div className={styles["error__message message"]}>
            <h1 className={styles["message__title"]}>Page Not Found</h1>
            <p className={styles["message__text"]}>We&apos;re sorry, the page you were looking for isn&apos;t found here.</p>
            <br></br>
          </div>
          <div className={styles["error__nav e-nav"]}>
            <a href="/" className={styles["e-nav__link"]}></a>
          </div>
        </div>
      </section>

    </main>
  )
}