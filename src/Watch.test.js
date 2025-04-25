import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Watch from './Watch';

describe('Watch component – Forward 10s button', () => {
  test('clicking forward advances currentTime by 10s', () => {
    const { container, getByText } = render(<Watch />);
    const video = container.querySelector('video');
    video.currentTime = 5;
    video.duration = 100;

    fireEvent.click(getByText(/10s/));
    expect(video.currentTime).toBe(15);
  });
});
