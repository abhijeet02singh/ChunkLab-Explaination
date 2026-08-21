export type SplitterType =
  | 'Recursive Character Splitter'
  | 'Character Splitter'
  | 'Sentence Splitter'
  | 'Token-based'
  | 'Markdown/Structure-based'
  | 'Document Structure Chunking';

export interface ChunkItem {
  id: number;
  text: string;
  start: number;
  end: number;
  charCount: number;
  color: string;
  borderColor?: string;
}


export interface ChunkStats {
  totalChars: number;
  numChunks: number;
  avgChunkSize: number | string;
}
