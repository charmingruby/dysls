import { parseJSON } from '@/helpers/json'
import { Response } from '@/helpers/response'
import { DynamoNotesRepository } from '@/repositories/dynamo/notes-repository'
import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { z } from 'zod'

const updateNoteSchema = z.object({
  content: z
    .string({ required_error: 'Content is required' })
    .min(1, 'Content is required')
    .max(128, 'Max content length reached'),
  tags: z.string({ required_error: 'Tags are required' }).array(),
})

export async function handler(event: APIGatewayProxyEventV2) {
  const { noteId } = event.pathParameters
  const body = parseJSON(event.body)

  const notesRepository = new DynamoNotesRepository()

  const { Item } = await notesRepository.findById(noteId)
  if (!Item) {
    return Response.notFoundErrorResponse('note')
  }

  const validationResult = updateNoteSchema.safeParse(body)
  if (!validationResult.success) {
    console.log(validationResult.error)
    const errMsg = validationResult.error.issues
      .map((e) => e.message)
      .join(', ')
    return Response.badRequestErrorResponse(errMsg)
  }

  const {
    $metadata: { httpStatusCode },
  } = await notesRepository.update(noteId, {
    content: validationResult.data.content,
    tags: validationResult.data.tags,
  })

  if (httpStatusCode !== 200) {
    if (httpStatusCode >= 400 && httpStatusCode < 500) {
      return Response.badRequestErrorResponse('Error updating note')
    }

    return Response.internalServerError()
  }

  return Response.okResponse('Note updated')
}
