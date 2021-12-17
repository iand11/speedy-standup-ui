export interface Blocker {
  _id?: string,
  name: string,
  blocker: string,
  ticket: string,
  createdAt: Date
}

export type User = {
  name: string,
  _id: string,
  email: string,
}