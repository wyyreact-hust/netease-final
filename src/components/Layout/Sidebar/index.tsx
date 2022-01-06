import React from 'react'
import MusicDetail from './MusicDetail'
import { PlayMusicStateContext } from 'reducers/playMusic'
import styles from './style.module.css'
const { useContext } = React

const Sidebar = () => {
  const playState = useContext(PlayMusicStateContext)
  return (
    <div className={styles.root}>
      {!!playState.musicId && <MusicDetail />}
    </div>
  )
}

export default Sidebar
