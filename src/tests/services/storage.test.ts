import { get, set, clear } from '../../services/storage';

describe('Sotrage Test Suite', () => {

  const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  const clearSpy = jest.spyOn(Storage.prototype, 'clear');

  it('should make correct request to get data', () => {
    // when
    get('token');

    // then
    expect(getItemSpy).toBeCalledWith('token')
  });

  it('should make correct request to set data', () => {
    // when
    const user = { name: 'ian', email: 'test@test.com', _id: 'U_123' }
    set('user', user);

    // then
    expect(setItemSpy).toBeCalledWith('user', user);
  });

  it('should make correct request to clear data', () => {
    // when
    clear();

    // then
    expect(clearSpy).toBeCalled()
  })
})