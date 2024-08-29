import { Response } from '@/helpers/response'
import { DynamoNotesRepository } from '@/repositories/dynamo/notes-repository'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

export async function handler(_event: APIGatewayProxyEventV2) {
  const notesRepository = new DynamoNotesRepository()

  const op = await notesRepository.findMany()
  if (op.$metadata.httpStatusCode !== 200) {
    return Response.internalServerError()
  }

  return Response.okResponse(`${op.Count} items found`, op.Items)
}
