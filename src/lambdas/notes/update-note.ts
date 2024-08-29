import { APIGatewayProxyEventV2 } from 'aws-lambda'

export async function handler(_event: APIGatewayProxyEventV2) {
  const res = {
    message: 'update note',
  }

  return {
    statusCode: 200,
    body: JSON.stringify(res),
  }
}
