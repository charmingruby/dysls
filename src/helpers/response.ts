export class Response {
  static internalServerError() {
    return {
      statusCode: 500,
      body: { message: 'Internal server error' },
    }
  }

  static createdResponse(entity: string, body: unknown) {
    const capitalizedEntity = entity.charAt(0).toUpperCase() + entity.slice(1)

    return {
      statusCode: 201,
      body: {
        message: `${capitalizedEntity} created successfully`,
        data: body,
      },
    }
  }

  static okResponse(message: string, body?: unknown) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message,
        data: body,
      }),
    }
  }
}
