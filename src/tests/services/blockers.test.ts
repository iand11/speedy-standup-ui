import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getAllBlockers, removeBlocker } from "../../services/blockers";
import { ActionTypes } from '../../reducers/actionTypes';

const BASE_URL = process.env.BASE_URL
const { SET_BLOCKERS } = ActionTypes

const dispatch = jest.fn();
const mockBlockers = [
  {
    name: 'ian',
    blocker: 'Blocker 1',
    ticket: 'Ticket 1',
    _id: '1',
    createdAt: "2021-12-15T21:03:38.528Z",
  },
  {
    name: 'ian',
    blocker: 'Blocker 2',
    ticket: 'Ticket 2',
    _id: '2',
    createdAt: "2021-12-15T21:03:38.528Z",
  },
  {
    name: 'ian',
    blocker: 'Blocker 3',
    ticket: 'Ticket 3',
    _id: '3',
    createdAt: "2021-12-15T21:03:38.528Z",
  }
]

describe('Blockers Service Test Suite', () => {
  let mock: MockAdapter;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });
  describe('Get All Blockers', () => {
    it('makes correct dispatch requests when blockers are returned', async () => {
      mock.onGet(`${BASE_URL}/blocker/get-all`).reply(200, mockBlockers)

      // when
      await getAllBlockers(dispatch);

      // then
      expect(dispatch).toHaveBeenCalledWith({ type: SET_BLOCKERS, payload: mockBlockers })
    })
  })

  describe('Remove Blocker', () => {
    it('makes correct dispatch calls when removing a blocker', async () => {
      mock.onDelete(`${BASE_URL}/blocker/1`).reply(200, { "message": "Blocker deleted successfully!" });
      const blockersForDelete = mockBlockers.map((blocker) => ({ ...blocker, createdAt: new Date() }))
      const updatedBlockers = blockersForDelete.filter((blocker) => blocker._id !== '1');

      // when
      await removeBlocker('1', dispatch, blockersForDelete);

      // then
      expect(dispatch).toHaveBeenCalledWith({ type: SET_BLOCKERS, payload: updatedBlockers })
    })
  })
})