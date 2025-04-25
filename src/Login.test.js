// login.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login component', () => {
  test('renders email & password inputs and the Login button', () => {
    render(
      <MemoryRouter>
        <Login onLogin={jest.fn()} />
      </MemoryRouter>
    );

    // email input
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    // password input
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    // login button
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
