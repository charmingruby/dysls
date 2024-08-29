import { v4 } from 'uuid'

export interface NoteProps {
  content: string
  tags?: string[]
}

export class Note {
  private _id: string
  private props: NoteProps
  private _createdAt: Date

  get id() {
    return this._id
  }

  get content() {
    return this.props.content
  }

  get tags() {
    return this.props.tags
  }

  get createdAt() {
    return this._createdAt
  }

  constructor(props: NoteProps) {
    this._id = v4().toString()
    this.props = props
    this._createdAt = new Date()
  }
}
