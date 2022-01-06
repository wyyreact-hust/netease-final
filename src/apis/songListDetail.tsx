import axios from 'helpers/axios'
import { IMusic, ISonglist } from './types/business'
import { ISongListInfo, ISongAllList, IGetSongListInfoRequest, IGetSongAllListRequest } from './types/songlist'

type GetSongListDetailFn = (params: IGetSongListInfoRequest) => Promise<any>
type GetSongAllListFn = (params: IGetSongAllListRequest) => Promise<{ playList: IMusic[]; total: number }>

const getSonglistDetail: GetSongListDetailFn = async ({ id }) => {
  const response = await axios({
    url: '/playlist/detail',
    params: {
      id,
    },
  })
  return response
}

const getSongAllList: GetSongAllListFn = async ({ id, limit }) => {
  const response = await axios({
    url: '/playlist/track/all',
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
