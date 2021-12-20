import React from 'react';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ComponentProvider } from '../../context/ComponentContext';
import { Blockers } from "../../components/Blockers";
import { render, screen, waitFor } from '@testing-library/react';

import { mockBlockers, initialState } from '../testUtils';

const BASE_URL = process.env.BASE_URL


describe("Blockers Test Suite", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });
  it('should render correct blockers based off selected date', async () => {
    mock.onGet(`${BASE_URL}/blocker/get-all`).reply(200, mockBlockers);

    render(
      <ComponentProvider store={initialState}>
        <Blockers />
      </ComponentProvider>
    );
    await waitFor(mock.onGet);
    const blockersWrapper = screen.getByTestId('blockers-container')

    expect(blockersWrapper.children).toHaveLength(mockBlockers.length);
  })
})