'use client';

import React from 'react';
import styles from "./components/loading.module.css"

const loading = () => {
    return (
        <main className={styles["loading-body"]}>
            <div className={styles["container"]}>
                <div className={styles["circle"]}></div>
                <div className={styles["circle"]}></div>
                <div className={styles["circle"]}></div>
                <div className={styles["circle"]}></div>
                <div className={styles["circle"]}></div>
                <div className={styles["circle"]}></div>
                <div className={styles["circle"]}></div>
                <div className={styles["circle"]}></div>
                <div className={styles["circle"]}></div>
                <div className={styles["circle"]}></div>
                <div className={styles["circle"]}></div>
                <div className={styles["circle"]}></div>
                <div className={styles["circle"]}></div>
                <div className={styles["circle"]}></div>
                <div className={styles["circle"]}></div>
                <div className={styles["circle"]}></div>
            </div>
        </main>
    )
};

export default loading;