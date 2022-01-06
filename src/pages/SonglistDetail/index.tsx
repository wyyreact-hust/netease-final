import React from 'react'
import { Spinner } from '@blueprintjs/core'
import { useParams } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'

import ErrorPage from 'components/ErrorLoading'
import MusicList from 'components/MusicList'
import BasicInfo from './BasicInfo'
import { createMusic } from 'helpers/business'
import { IMusic } from 'apis/types/business'
import { PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import styles from './style.module.css'
import { LogStateContext } from 'reducers/log'
import listDetailApis from 'apis/songListDetail'

import { getSonglistDetail } from 'graphql/music'
import useAsyncFn from 'hooks/useAsyncFn'

const { useEffect, useContext } = React

const SonglistDetail = () => {
  // const [infoState, getInfoState] = useAsyncFn(listDetailApis.getSonglistDetail);
  // const [listState, getListState] = useAsyncFn(listDetailApis.getSongAllList);

  // useEffect(()=>{
  //   getInfoState({id: songlistId as any as number});
  //   getListState({id: songlistId as any as number});
  // })

  // const info = infoState.value;
  // const songs = listState.value?.playList;
  // const loading = infoState.loading || listState.loading;

  const params = useParams<IDictionary<string>>()
  const { songlistId } = params
  const dispatch = useContext(PlayMusicDispatchContext)
  const loginState = useContext(LogStateContext)
  const { isLogined: isLogin, user } = loginState

  const [getSonglistDetailGql, { loading, data }] = useLazyQuery(getSonglistDetail, {
    onError: (error) => {
      window.alert(error.message)
    },
  })
  const result = data?.getSonglistDetail
  const songs = result?.songs as IMusic[]
  useEffect(() => {
    getSonglistDetailGql({
      variables: {
        id: songlistId,
      },
    })
  }, [songlistId])

  const playAll = (autoPlay?: boolean) => {
    const list = (songs as IMusic[]).map((item) => {
      return createMusic({
        ...item,
        duration: item.duration / 1000,
      })
    })

    dispatch({
      type: ACTIONS.SET_PLAY_LIST,
      payload: {
        playList: list,
      },
    })

    if (autoPlay) {
      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: list[0].id,
          music: list[0],
        },
      })
    }
  }

  if (!isLogin) {
    //登录后才允许查看歌单
    return <ErrorPage />
  } else {
    return (
      <div className={styles.root}>
        {loading ? (
          <Spinner className='spinner' />
        ) : (
          <>
            <div className={styles.basicInfo}>
              <BasicInfo data={result?.songlist} onPlayAll={playAll} />
            </div>

            <div className={styles.content}>
              <MusicList data={songs as any as IMusic[]} onPlayAll={playAll} />
            </div>
          </>
        )}
      </div>
    )
  }
}

export default SonglistDetail
