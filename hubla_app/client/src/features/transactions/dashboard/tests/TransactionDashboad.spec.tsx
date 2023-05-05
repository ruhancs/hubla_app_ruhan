import { render, screen } from '@testing-library/react';

import TransactionDashboard from '../TransactionDashboard';

describe('test Transaction Dashboard', () => {
  it('should render a TransactionDashboard component', () => {
    render(<TransactionDashboard />);

    expect(screen.getAllByText('Loading app')).toBeDefined();
    // expect(screen.getByTestId('id_mock')).toBeDefined();
  });
});
