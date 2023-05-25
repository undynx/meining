import { render } from '@testing-library/react';
import {
  describe, expect, it,
} from 'vitest';
import { UserCard } from './index';

describe('UserCard', () => {
  it('should render successfully', () => {
    const baseElement = render(<UserCard name="random" lastname="random" imageUrl="" />);
    expect(baseElement).toBeTruthy();
  });

  it('should render with a name and last name', () => {
    const baseElement = render(<UserCard name="Name" lastname="Last Name" imageUrl="" />);
    expect(baseElement.findByText('Name')).toBeTruthy();
    expect(baseElement.findByText('Last Name')).toBeTruthy();
  });

  it('should render with an image if it was provided', () => {
    render(<UserCard name="random" lastname="random" imageUrl="https://i.imgur.com/H37kxPH.jpeg" />);
    const displayedImage = document.querySelector('img') as HTMLImageElement;
    expect(displayedImage.src).toBe('https://i.imgur.com/H37kxPH.jpeg');
  });

  it('should render with a default image if it was not provided', () => {
    render(<UserCard name="random" lastname="random" />);
    const displayedImage = document.querySelector('img') as HTMLImageElement;
    expect(displayedImage.src).toContain('profile-default.jpg');
  });
});
