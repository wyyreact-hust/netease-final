import React from 'react'
import { Icon } from '@blueprintjs/core'
import { Slider } from '@mui/material'
import ProgressBar from 'components/ProgressBar'
import { AudioContext } from 'reducers/playMusic'
import styles from './style.module.css'

const { useContext, useMemo, useCallback } = React

const PlayVolume = () => {
  const audioInfo = useContext(AudioContext)
  const { state, controls } = audioInfo

  const handleBarClick = useCallback(
    (percent: number) => {
      controls?.volume(percent)
    },
    [controls],
  )

  const originDonePercent = useMemo(() => {
    const volume = Number((state?.volume || 0).toFixed(2))
    return Math.floor(volume * 100)
  }, [state?.volume])

  const handleChange = (event: Event, newValue: number | number[]) => {
    controls?.volume((newValue as number) / 100)
  }

  return (
    <div className={styles.root}>
      <Icon icon='volume-off' size={20} />
      <div className={styles.progress}>
        <Slider
          className={styles.bar}
          defaultValue={originDonePercent}
          onChange={handleChange}
          size='small'
          sx={{ color: '#ec4141' }}
        />
      </div>
    </div>
  )
}
export default PlayVolume
