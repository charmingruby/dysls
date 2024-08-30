import { NotesTbl } from '@/constants/tables'
import { dynamoClient } from '@/libs/dynamo-client'
import { Note } from '@/models/note'
import {
  DeleteCommand,
  DeleteCommandOutput,
  GetCommand,
  GetCommandOutput,
  PutCommand,
  PutCommandOutput,
  ScanCommand,
  ScanCommandOutput,
} from '@aws-sdk/lib-dynamodb'

interface NotesRepository {
  findById(id: string): Promise<GetCommandOutput>
  findMany(): Promise<ScanCommandOutput>
  create(note: Note): Promise<PutCommandOutput>
  delete(id: string): Promise<DeleteCommandOutput>
}

export class DynamoNotesRepository implements NotesRepository {
  async findById(id: string): Promise<GetCommandOutput> {
    const cmd = new GetCommand({
      TableName: NotesTbl,
      Key: {
        id,
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

  async delete(id: string): Promise<DeleteCommandOutput> {
    const cmd = new DeleteCommand({
      TableName: NotesTbl,
      Key: {
        id,
      },
    })

    return await dynamoClient.send(cmd)
  }
}
