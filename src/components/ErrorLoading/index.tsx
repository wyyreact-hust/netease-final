import styles from './styles.module.css'
import React from 'react'
import errorImg from 'assets/404.png'
export default function ErrorPage() {
  return (
    <div className={styles.root}>
      <div className={styles.box1}>
        <img src={errorImg} />
      </div>
      <div className={styles.box2}>
        <h1>请先登录后再查看歌单</h1>
      </div>
    </div>
  )
}
