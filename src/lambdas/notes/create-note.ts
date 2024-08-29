import { parseJSON } from '@/helpers/json'
import { Response } from '@/helpers/response'
import { Note } from '@/models/note'
import { NotePresenter } from '@/presenters/note-presenter'
import { DynamoNotesRepository } from '@/repositories/dynamo/notes-repository'
import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { z } from 'zod'

const createNoteSchema = z.object({
  content: z
    .string({ required_error: 'Content is required' })
    .min(1, 'Content is required')
    .max(128, 'Max content length reached'),
  tags: z.string().array().optional(),
})

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
    return Response.internalServerError()
  }

  const convNote = NotePresenter.toHTTP(note)

  return Response.createdResponse('note', { note: convNote })
}
