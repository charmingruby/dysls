import { toJSON } from '@/helpers/json'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

interface LambaUpdateNoteResponse {
  message: string
}

export async function handler(_event: APIGatewayProxyEventV2) {
  const res: LambaUpdateNoteResponse = {
    message: 'update note',
  }

  const json = toJSON<LambaUpdateNoteResponse>(res)

  return json
}
