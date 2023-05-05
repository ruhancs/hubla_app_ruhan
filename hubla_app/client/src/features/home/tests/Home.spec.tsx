import { render, screen } from '@testing-library/react';

import HomePage from '../HomePage';

const TEXT_HEADER_MOCK = 'header_mock';

jest.mock('react-router-dom', () => ({
  Link: () => jest.fn(),
}));

describe('test Home', () => {
  it('should renderi a HomePage component', () => {
    render(<HomePage />);
    // screen.debug();
    expect(screen.getByTestId(TEXT_HEADER_MOCK)).toBeDefined();
    expect(screen.getByText('Go to Transactions')).toBeDefined();
  });
});
