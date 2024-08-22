export interface Thumbnail {
  path: string
  extension: string
}

export interface CollectionItem {
  resourceURI: string
  name: string
}

export interface Collection<T extends CollectionItem> {
  available: number
  collectionURI: string
  items: T[]
  returned: number
}

export interface ComicItem extends CollectionItem {}
export interface SeriesItem extends CollectionItem {}
export interface StoryItem extends CollectionItem {
  type: string
}
export interface EventItem extends CollectionItem {}

export type Comics = Collection<ComicItem>
export type Series = Collection<SeriesItem>
export type Stories = Collection<StoryItem>
export type Events = Collection<EventItem>

export interface Url {
  type: string
  url: string
}

export interface CharacterInterface<T = string> {
  id: number
  name: T
  description: T
  modified: string
  thumbnail: Thumbnail
  resourceURI: T
  comics: Comics
  series: Series
  stories: Stories
  events: Events
  urls: Url[]
}

export interface Data<T extends CharacterInterface> {
  then(arg0: (jsonData: any) => CharacterInterface<string>[]): unknown
  results: T[]
}

export interface Chars<T extends CharacterInterface> {
  data: Data<T>
}
