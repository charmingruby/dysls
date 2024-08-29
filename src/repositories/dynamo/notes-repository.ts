import { NotesTbl } from '@/constants/tables'
import { dynamoClient } from '@/lib/dynamo-client'
import { Note } from '@/models/note'
import {
  PutCommand,
  PutCommandOutput,
  ScanCommand,
  ScanCommandOutput,
} from '@aws-sdk/lib-dynamodb'

interface NotesRepository {
  findMany(): Promise<ScanCommandOutput>
  create(note: Note): Promise<PutCommandOutput>
}

export class DynamoNotesRepository implements NotesRepository {
  async create(note: Note): Promise<PutCommandOutput> {
    const { id, content, tags, createdAt } = note

    const cmd = new PutCommand({
      TableName: NotesTbl,
      Item: {
        id,
        content,
        tags,
        createdAt,
      },
    })

    return await dynamoClient.send(cmd)
  }

  async findMany(): Promise<ScanCommandOutput> {
    const cmd = new ScanCommand({
      TableName: NotesTbl,
    })

    return await dynamoClient.send(cmd)
  }
}
