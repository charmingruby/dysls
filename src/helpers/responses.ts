import { toJSON } from './json'

export interface InternalServerError {
  message: string
}

export function internalServerErrorResponse() {
  return {
    status: 500,
    body: toJSON<InternalServerError>({ message: 'Internal server error' }),
  }
}
