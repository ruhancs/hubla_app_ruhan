import { render, screen } from '@testing-library/react';

import TransactionForm from '../TransactionForm';

const mock_id = 'mock_id';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  createBrowserRouter: () => jest.fn(),
}));

describe('test Transaction Form', () => {
  it('should render a TransactionForm component', () => {
    render(<TransactionForm />);

    expect(screen.getAllByTestId(mock_id));
  });
});
