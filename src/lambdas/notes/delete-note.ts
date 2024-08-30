import { Response } from '@/helpers/response'
import { DynamoNotesRepository } from '@/repositories/dynamo/notes-repository'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

export async function handler(event: APIGatewayProxyEventV2) {
  const { noteId } = event.pathParameters

  const notesRepository = new DynamoNotesRepository()

  const { Item } = await notesRepository.findById(noteId)
  if (!Item) {
    return Response.notFoundErrorResponse('note')
  }

  const {
    $metadata: { httpStatusCode },
  } = await notesRepository.delete(noteId)

  if (httpStatusCode !== 200) {
    if (httpStatusCode >= 400 && httpStatusCode < 500) {
      return Response.badRequestErrorResponse('Error deleting note')
    }

    return Response.internalServerError()
  }

  return Response.okResponse('Note deleted successfully')
}
