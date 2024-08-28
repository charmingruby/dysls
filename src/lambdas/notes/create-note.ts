import { parseJSON, toJSON } from '@/helpers/json'
import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { z } from 'zod'

const createNoteSchema = z.object({
  content: z
    .string({ required_error: 'Content is required' })
    .min(1, 'Content is required')
    .max(128, 'Max content length reached'),
})

interface LambaCreateNoteResponse {
  content: string
}

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

  const res: LambaCreateNoteResponse = {
    content: validationResult.data.content,
  }

  const json = toJSON<LambaCreateNoteResponse>(res)

  return {
    statusCode: 201,
    body: json,
  }
}
