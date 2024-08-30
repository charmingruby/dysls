import { Response } from '@/helpers/response'
import { DynamoNotesRepository } from '@/repositories/dynamo/notes-repository'
import { APIGatewayProxyEventV2 } from 'aws-lambda'
export async function handler(event: APIGatewayProxyEventV2) {
  const { noteId } = event.pathParameters

  const notesRepository = new DynamoNotesRepository()

  const op = await notesRepository.findById(noteId)

  if (op.$metadata.httpStatusCode >= 500) {
    return Response.internalServerError()
  }

  if (!op.Item) {
    return Response.notFoundErrorResponse('note')
  }

  return Response.okResponse('Note found', op.Item)
}
