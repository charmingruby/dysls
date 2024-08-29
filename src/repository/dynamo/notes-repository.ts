import { NotesTbl } from '@/constants/tables'
import { dynamoClient } from '@/lib/dynamo-client'
import { Note } from '@/models/note'
import { PutCommand, PutCommandOutput } from '@aws-sdk/lib-dynamodb'

interface NotesRepository {
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
        createdAt: createdAt.toISOString(),
      },
    })

    return await dynamoClient.send(cmd)
  }
}
