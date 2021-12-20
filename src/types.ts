export interface Blocker {
  _id?: string,
  name: string,
  blocker: string,
  ticket: string,
  createdAt: Date
}

export type User = {
  name: string,
  id: string,
  email: string,
}

export type CreateBlockerProps = {
  name: string,
  blocker: string,
  ticket: string,
}