import { parseJSON, toJSON } from '@/helpers/json'
import { internalServerErrorResponse } from '@/helpers/responses'
import { Note } from '@/models/note'
import { HTTPNote, NotePresenter } from '@/presenters/note-presenter'
import { DynamoNotesRepository } from '@/repository/dynamo/notes-repository'
import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { z } from 'zod'

const createNoteSchema = z.object({
  content: z
    .string({ required_error: 'Content is required' })
    .min(1, 'Content is required')
    .max(128, 'Max content length reached'),
  tags: z.string().array().optional(),
})

interface LambaCreateNoteResponse {
  message: string
  note: HTTPNote
}

export async function handler(event: APIGatewayProxyEventV2) {
  const body = parseJSON(event.body)

  const validationResult = createNoteSchema.safeParse(body)
  if (!validationResult.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: validationResult.error.issues.map((e) => e.message).join(', '),
      }),
    }
  }

  const tags = !validationResult.data.tags ? [] : validationResult.data.tags

  const note = new Note({
    content: validationResult.data.content,
    tags,
  })

  const notesRepository = new DynamoNotesRepository()

  const op = await notesRepository.create(note)
  if (op.$metadata.httpStatusCode !== 200) {
    return internalServerErrorResponse()
  }

  const notePresenter = NotePresenter.toHTTP(note)

  const res: LambaCreateNoteResponse = {
    message: 'Note created successfully.',
    note: notePresenter,
  }

  const json = toJSON<LambaCreateNoteResponse>(res)

  return {
    statusCode: 201,
    body: json,
  }
}
