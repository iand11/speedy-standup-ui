export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined ? { type: Key } : { type: Key; payload: M[Key] };
};

export enum ActionTypes {
  SET_IS_AUTHENTICATED = "SET_IS_AUTHENTICATED",
  SET_AUTH_ERROR = "SET_AUTH_ERROR",
  SET_BLOCKERS = "SET_BLOCKERS",
  SET_DATE = "SET_DATE",
  SET_USER = "SET_USER",
  RESET = "RESET",
}

export type Actions =
  | RootActions
  | AuthActions
  | BlockerActions
  | DateActions
  | UserActions

// Root
type RootPayload = {
  [ActionTypes.RESET]: boolean
}

type RootActions = ActionMap<RootPayload>[keyof ActionMap<RootPayload>]

// Auth
type AuthPayload = {
  [ActionTypes.SET_IS_AUTHENTICATED]: boolean,
  [ActionTypes.SET_AUTH_ERROR]: boolean,
}

type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>]

// Blockers
type BlockerPayload = {
  [ActionTypes.SET_BLOCKERS]: Array<{ name: string, blocker: string, ticket: string, createdAt: Date }>
}

type BlockerActions = ActionMap<BlockerPayload>[keyof ActionMap<BlockerPayload>]

// Selected Date
type DatePayload = {
  [ActionTypes.SET_DATE]: Date
}

type DateActions = ActionMap<DatePayload>[keyof ActionMap<DatePayload>]

// User
type UserPayload = {
  [ActionTypes.SET_USER]: { name: string, email: string, id: string }
}

type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];