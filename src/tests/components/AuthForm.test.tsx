import React from 'react';
import { AuthForm } from '../../components/AuthForm';
import { ComponentProvider, ComponentContext } from '../../context/ComponentContext';
import { render, fireEvent } from '@testing-library/react';
import * as authService from '../../services/auth';
import { initialState } from '../testUtils';

describe('Authform Test Suite', () => {
  it('displays error text when there is an error returned from api request', () => {
    const { container } = render(
      <ComponentProvider store={{ ...initialState, loginError: true }}>
        <AuthForm />
      </ComponentProvider>
    );

    expect(container).toHaveTextContent('Incorrect Combination of Email and Password');
  });

  it('makes handles login button click correctly', () => {
    const loginSpy = jest.spyOn(authService, 'loginUser');
    const email = "me@me.com";
    const password = "Password123"
    const mockDispatch = jest.fn();
    const { container } = render(
      <ComponentContext.Provider value={{ state: initialState, dispatch: mockDispatch }}>
        <AuthForm />
      </ComponentContext.Provider>
    );

    const loginButton = container.querySelector('button')!;
    const emailInput = container.querySelector('#email-input')!;
    const passwordInput = container.querySelector('#password-input')!;

    // when
    fireEvent.change(emailInput, { target: { value: email } })
    fireEvent.change(passwordInput, { target: { value: password } })
    fireEvent.click(loginButton);

    // then
    expect(loginSpy).toHaveBeenCalledWith({ email, password, dispatch: mockDispatch })
  })
})
