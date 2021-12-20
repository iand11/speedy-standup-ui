import React from 'react';
import { Header } from "../../components/Header";
import { render, fireEvent } from '@testing-library/react';
import * as authService from '../../services/auth';
import { ComponentProvider } from '../../context/ComponentContext';
import { initialState } from '../testUtils';

describe('Header Test Suite', () => {
  it('should handle logout button click correctly', () => {
    const logoutSpy = jest.spyOn(authService, "logoutUser");
    const { container } = render(
      <ComponentProvider store={{...initialState, isAuthenticated: true }}>
        <Header />
      </ComponentProvider>
    );

    const logoutButton = container.querySelector('#logout-button')!;

    // when
    fireEvent.click(logoutButton);

    // then
    expect(logoutSpy).toHaveBeenCalled()
  })
})