import React from 'react';
import { ComponentProvider, ComponentContext } from '../../context/ComponentContext';
import { InputForm } from '../../components/Form';
import { render, fireEvent } from '@testing-library/react';
import * as blockerService from '../../services/blockers';

import { initialState } from '../testUtils';

describe("Input Form Test Suite", () => {
  it('should update values of input fields correctly', () => {
    const { container } = render(
      <ComponentProvider store={initialState}>
        <InputForm />
      </ComponentProvider>
    );

    const nameInput = container.querySelector('#name-input')!;
    const ticketInput = container.querySelector('#ticket-input')!;
    const blockerInput = container.querySelector('#blocker-input')!;


    expect(nameInput).toHaveValue('');
    expect(ticketInput).toHaveValue('');
    expect(blockerInput).toHaveValue('');

    // when
    fireEvent.change(nameInput, { target: { value: 'ian' } });
    fireEvent.change(ticketInput, { target: { value: 'ticket' } });
    fireEvent.change(blockerInput, { target: { value: 'blocker' } });

    // then
    expect(nameInput).toHaveValue('ian');
    expect(ticketInput).toHaveValue('ticket')
    expect(blockerInput).toHaveValue('blocker')
  })

  it('should make correct request when submit button is clicked', () => {
    const addBlockerSpy = jest.spyOn(blockerService, 'addBlocker');
    const mockDispatch = jest.fn();
    const { container } = render(
      <ComponentContext.Provider value={{ state: initialState, dispatch: mockDispatch}}>
        <InputForm />
      </ComponentContext.Provider>
    );

    const nameInput = container.querySelector('#name-input')!;
    const ticketInput = container.querySelector('#ticket-input')!;
    const blockerInput = container.querySelector('#blocker-input')!;
    const submitButton = container.querySelector('#submit-button')!;

    fireEvent.change(nameInput, { target: { value: 'ian' } });
    fireEvent.change(ticketInput, { target: { value: 'ticket' } });
    fireEvent.change(blockerInput, { target: { value: 'blocker' } });

    // when
   fireEvent.click(submitButton);

    // then
    expect(addBlockerSpy).toHaveBeenCalledWith({ name: 'ian', ticket: 'ticket', blocker: 'blocker', dispatch: mockDispatch })
  })
})