export const initialState = {
  userInfo: {
    name: "",
    email: "",
    _id: "",
  },
  blockers: [],
  selectedDate: new Date(),
  isAuthenticated: false,
  loginError: false,
};

export const mockBlockers = [
  {
    name: 'ian',
    blocker: 'Blocker 1',
    ticket: 'Ticket 1',
    _id: '1',
    createdAt: new Date(),
  },
  {
    name: 'ian',
    blocker: 'Blocker 2',
    ticket: 'Ticket 2',
    _id: '2',
    createdAt: new Date(),
  },
  {
    name: 'ian',
    blocker: 'Blocker 3',
    ticket: 'Ticket 3',
    _id: '3',
    createdAt: new Date(),
  }
]