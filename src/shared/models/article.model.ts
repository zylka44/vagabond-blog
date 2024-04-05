export interface NewArticle {
  title: string;
  date?: string;
  mainPictureUrl?: string;
  publication?: Publication;
  chunks?: Chunk[];
}

export interface Article extends NewArticle {
  id: string;
}

export interface Chunk {
  id: string;
  type: ChunkType;
  text?: string;
  pictures?: Picture[];
  info?: string;
}

export interface Publication {
  published?: boolean;
  date?: string;
  type?: TripType;
  coordinates?: string;
  tags?: string;
}

export interface Picture {
  id: string;
  url: string;
  description?: string;
  location?: string;
}

export type ChunkType = 'subtitle' | ParagraphType | PictureType;

export type ParagraphType =
  | 'paragraph'
  | 'paragraph-picture'
  | 'picture-paragraph'
  | 'paragraph-info'
  | 'info-paragraph';

export type PictureType = 'picture' | 'picture-double' | 'picture-triple' | 'picture-qauadruple';

export type TripType = 'faraway' | 'bike' | 'hiking';

export type Region = 'world' | 'europe' | 'poland' | 'pomeranian';

export type isLoggedInType = 'true' | 'false';

export type ModalType = 'login' | 'search' | 'map' | 'confirm';

export type ModalConfig = SearchModalConfig | ConfirmModalConfig;

export interface SearchModalConfig {
  tripType?: TripType;
}

export interface ConfirmModalConfig {
  text: string;
  onConfirm: () => void;
}
