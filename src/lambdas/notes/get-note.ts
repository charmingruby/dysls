import { toJSON } from '@/helpers/json'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

interface LambaGetNoteResponse {
  message: string
}

export async function handler(_event: APIGatewayProxyEventV2) {
  const res: LambaGetNoteResponse = {
    message: 'get note',
  }

  const json = toJSON<LambaGetNoteResponse>(res)

  return {
    statusCode: 200,
    body: json,
  }
}
