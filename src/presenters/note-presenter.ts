import { Note } from '@/models/note'

export interface HTTPNote {
  id: string
  content: string
  tags: string[]
  createdAt: string
}

export class NotePresenter {
  static toHTTP({ id, content, tags, createdAt }: Note): HTTPNote {
    return { id, content, tags, createdAt }
  }
}
