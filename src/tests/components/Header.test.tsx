import React from 'react';
import { Header } from "../../components/Header";
import { render, fireEvent } from '@testing-library/react';
import * as authService from '../../services/auth';

describe('Header Test Suite', () => {
  it('should handle logout button click correctly', () => {
    const logoutSpy = jest.spyOn(authService, "logoutUser");
    const { container } = render(<Header />);

    const logoutButton = container.querySelector('#logout-button');

    // when
    // @ts-ignore
    fireEvent.click(logoutButton);

    // then
    expect(logoutSpy).toHaveBeenCalled()
  })
})