import { toJSON } from '@/helpers/json'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

interface LambaDeleteNoteResponse {
  message: string
}

export async function handler(_event: APIGatewayProxyEventV2) {
  const res: LambaDeleteNoteResponse = {
    message: 'delete note',
  }

  const json = toJSON<LambaDeleteNoteResponse>(res)

  return {
    statusCode: 200,
    body: json,
  }
}
