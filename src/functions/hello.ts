import { toJSON } from '@/helpers/json'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

interface LambdaHelloResponse{
  message: string
}

export async function handler(event: APIGatewayProxyEventV2) {
  const res:LambdaHelloResponse = {
    message: "Hello"
  } 

  const json = toJSON<LambdaHelloResponse>(res)

  return json
}
