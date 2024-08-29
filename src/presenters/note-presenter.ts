import { Note } from '@/models/note'

export interface HTTPNote {
  id: string
  content: string
  tags: string[]
  createdAt: Date
}

export class NotePresenter {
  static toHTTP(model: Note): HTTPNote {
    return {
      id: model.id,
      content: model.content,
      tags: model.tags,
      createdAt: model.createdAt,
    }
  }
}
