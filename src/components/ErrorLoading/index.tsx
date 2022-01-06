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
        <h1>由于网易云接口限制，必须先登录才能访问该页面</h1>
      </div>
    </div>
  )
}
