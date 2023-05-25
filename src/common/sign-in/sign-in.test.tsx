import { render } from '@testing-library/react';
import {
  describe, expect, it,
} from 'vitest';
import { SignIn } from './index';

describe('SignIn', () => {
  it('should render successfully', () => {
    const baseElement = render(<SignIn />);
    expect(baseElement).toBeTruthy();
  });

  it('should have the expected fields', () => {
    const baseElement = render(<SignIn />);
    expect(baseElement.findByText('Usuario')).toBeTruthy();
    expect(baseElement.findByText('Contraseña')).toBeTruthy();
  });

  it('should have a link to reset password', () => {
    render(<SignIn />);
    expect(document.querySelector('a')).toBeTruthy();
  });
});
