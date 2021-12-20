import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { checkAuth, loginUser, logoutUser } from '../../services/auth';
import { ActionTypes } from '../../reducers/actionTypes';

const BASE_URL = process.env.BASE_URL

const { SET_IS_AUTHENTICATED, SET_USER } = ActionTypes;

const dispatch = jest.fn();
const mockUser = { name: 'ian', email: 'test@test.com', _id: 'U_123' }

describe('Auth Service Test Suite', () => {
  let mock: MockAdapter;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });
  describe('Check Auth', () => {
    it('makes correct dispatch calls when a user is authenticated', async () => {
      mock.onGet(`${BASE_URL}/user/me`).reply(200, { ...mockUser })
      // when
      await checkAuth(dispatch);

      // then
      expect(dispatch).toBeCalledWith({ type: SET_USER, payload: mockUser })
      expect(dispatch).toBeCalledWith({ type: SET_IS_AUTHENTICATED, payload: true })
    })

    it('does not make dispatch calls when a user is not authenticated', async () => {
      mock.onGet(`${BASE_URL}/user/me`).reply(401)

      // when
      await checkAuth(dispatch);

      // then
      // expect(mockMe).toBeCalled();
      expect(dispatch).toBeCalledWith({ type: ActionTypes.SET_IS_AUTHENTICATED, payload: false })
      expect(dispatch).toBeCalledWith({ type: ActionTypes.RESET, payload: true })
    })
  });

  describe('Login', () => {
    it('makes correct dispatch calles after a user is logged in', async () => {
      mock.onPost(`${BASE_URL}/user/login`).reply(200, { ...mockUser })

      // when
      await loginUser('ian@me.com', 'P123456', dispatch);

      // then
      expect(dispatch).toBeCalledWith({ type: SET_USER, payload: mockUser })
      expect(dispatch).toBeCalledWith({ type: SET_IS_AUTHENTICATED, payload: true })
    })
  })

  describe('Logoout', () => {
    it('makes correct dispatch calls when logging a user out', () => {
      // when
      logoutUser(dispatch);

      // then
      expect(dispatch).toBeCalledWith({ type: ActionTypes.SET_IS_AUTHENTICATED, payload: false })
      expect(dispatch).toBeCalledWith({ type: ActionTypes.RESET, payload: true })
    })
  })
})