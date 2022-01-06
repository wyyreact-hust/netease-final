import React from 'react'
import { useHistory } from 'react-router-dom'
import { Icon } from '@blueprintjs/core'
import UserMenu from './UserMenu'
import Navbar from './Navbar'
import Searcher from './Searcher'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import styles from './style.module.css'

const { useContext } = React

const Header = () => {
  const history = useHistory()
  const dispatch = useContext(PlayMusicDispatchContext)
  const state = useContext(PlayMusicStateContext)
  const { showLyric } = state

  const handleGoBack = () => history.goBack()
  const handleGoForward = () => history.goForward()

  const hideLyric = () => {
    dispatch({
      type: ACTIONS.HIDE_LYRIC,
    })
  }

  return (
    <div className={styles.root}>
      <div className={styles.actions}>
        <div className={styles.backForward}>
          <div onClick={handleGoBack}>
            <Icon icon='chevron-left' color='white' />
          </div>
          <div onClick={handleGoForward}>
            <Icon icon='chevron-right' color='white' />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div>{!showLyric && <Navbar />}</div>
        <div className={styles.operations}>
          <Searcher />
          <UserMenu />
        </div>
      </div>
    </div>
  )
}

export default Header
