import { toJSON } from '@/helpers/json'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

interface LambaCreateNoteResponse {
  message: string
}

export async function handler(_event: APIGatewayProxyEventV2) {
  const res: LambaCreateNoteResponse = {
    message: 'create note',
  }

  const json = toJSON<LambaCreateNoteResponse>(res)

  return json
}
