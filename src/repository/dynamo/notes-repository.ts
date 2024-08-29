import { NotesTbl } from '@/constants/tables'
import { dynamoClient } from '@/lib/dynamo-client'
import { Note } from '@/models/note'
import { PutItemCommand, PutItemCommandOutput } from '@aws-sdk/client-dynamodb'

interface NotesRepository {
  create(note: Note): Promise<PutItemCommandOutput>
}

export class DynamoNotesRepository implements NotesRepository {
  async create(note: Note): Promise<PutItemCommandOutput> {
    const cmd = new PutItemCommand({
      TableName: NotesTbl,
      Item: {
        id: { S: note.id },
        content: { S: note.content },
        tags: { SS: note.tags },
        createdAt: { S: note.createdAt.toString() },
      },
    })

    return await dynamoClient.send(cmd)
  }
}
