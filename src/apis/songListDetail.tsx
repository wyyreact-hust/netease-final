import axios from 'helpers/axios'
import { IMusic, ISonglist } from './types/business'
import { ISongListInfo, ISongAllList, IGetSongListInfoRequest, IGetSongAllListRequest } from './types/songlist'

type GetSongListDetailFn = (params: IGetSongListInfoRequest) => Promise<ISonglist>
type GetSongAllListFn = (params: IGetSongAllListRequest) => Promise<{ playList: IMusic[]; total: number }>

const getSonglistDetail: GetSongListDetailFn = async ({ id }) => {
  const response = axios({
    url: '/playlist',
    params: {
      id,
    },
  })
  return response
}

const getSongAllList: GetSongAllListFn = async ({ id, limit }) => {
  const response = axios({
    url: '/playlist',
    params: {
      id,
      limit,
    },
  })
  return response
}

export default {
  getSonglistDetail,
  getSongAllList,
}
