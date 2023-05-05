import { render, screen } from '@testing-library/react';
import { Grid, Item, Segment } from 'semantic-ui-react';

import TransactionList from '../TransactionList';

const mock_id = 'mock_id';

describe('test Transaction List', () => {
  it('should render a TransctionList component', () => {
    render(<TransactionList />);

    expect(screen.getByTestId(mock_id)).toBeDefined();
  });
});
