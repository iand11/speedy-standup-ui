import React from 'react';
import { BlockerCard } from "../../components/BlockerCard";
import { render, fireEvent, screen } from '@testing-library/react'

const name = "Ian";
const blocker = "Testing";
const ticket = "ABC_123";
const deleteBlocker = jest.fn();

describe("Blocker Card Test Suite", () => {
  it("should display the correct text", () => {
    const { container } = render(<BlockerCard name={name} blocker={blocker} ticket={ticket} deleteBlocker={deleteBlocker} />);

    expect(container).toHaveTextContent(name);
    expect(container).toHaveTextContent(blocker);
    expect(container).toHaveTextContent(ticket);
  });

  it('should call correct function when delete button is pressed', () => {
    render(<BlockerCard name={name} blocker={blocker} ticket={ticket} deleteBlocker={deleteBlocker} />);
    const deleteButton = screen.getByTestId('delete-button');

    // when
    fireEvent.click(deleteButton);

    // then
    expect(deleteBlocker).toHaveBeenCalled();
  })
})