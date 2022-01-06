import { IArtist, IAlbum } from './business'

enum ORDER {
  HOT = 'hot',
  NEW = 'new',
}

export interface IGetSonglistsRequest {
  cat?: string
  order?: ORDER
  limit?: number
  offset?: number
}

export interface ICategory {
  activity: boolean
  category: number
  hot: boolean
  name: string
  type: number
}

export interface IGetSonglistCatsResponse {
  all: ICategory
  categories: IDictionary<string>
  sub: ICategory[]
}

export interface ISongListInfo {
  id: number
  name: string
  coverImgUrl: string
}

export interface ISongAllList {
  name: string
  id: number
  ar: IArtist
  al: IAlbum
}
