import React from 'react'
import { Icon } from '@blueprintjs/core'
import cn from 'classnames'

import { IGetSonglistCatsResponse, ICategory } from 'apis/types/songlist'
import { noop } from 'helpers/fn'
import styles from './style.module.css'

interface IProps {
  cats?: IGetSonglistCatsResponse
  hotCats?: ICategory[]
  selectedCat?: string
  onCatSelect?: (cat: string) => void
}

const { useState } = React

export const DEFAULT_CAT = '全部'

const Categories: React.FC<IProps> = ({ cats, hotCats, selectedCat, onCatSelect = noop }) => {
  const [currentCat, setCurrentCat] = useState(selectedCat || DEFAULT_CAT)

  const handleCatClick = (cat: string) => {
    setCurrentCat(cat)
    onCatSelect(cat)
  }

  return (
    <div className={styles.root}>
      <div className={styles.hotCats}>
        {hotCats?.map(({ name }) => {
          return (
            <div
              key={name}
              className={cn(styles.tag, currentCat === name && styles.active)}
              onClick={() => handleCatClick(name)}
            >
              {name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Categories
