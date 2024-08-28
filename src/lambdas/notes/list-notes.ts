import { toJSON } from '@/helpers/json'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

interface LambaListNotesResponse {
  message: string
}

export async function handler(_event: APIGatewayProxyEventV2) {
  const res: LambaListNotesResponse = {
    message: 'list notes',
  }

  const json = toJSON<LambaListNotesResponse>(res)

  return {
    statusCode: 200,
    body: json,
  }
}
