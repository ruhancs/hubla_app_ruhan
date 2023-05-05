import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Header, Segment } from 'semantic-ui-react';

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header data-testid="header_mock" as="h1" inverted>
          Hubla App
        </Header>
        <Header as="h2" inverted content="Get start to view the transactions" />
        <Button
          data-testid="button_mock"
          as={NavLink}
          to="/transactions"
          size="huge"
          inverted
        >
          Go to Transactions
        </Button>
        <Button data-testid="button_mock" as={Link} to="/users" size="huge">
          View Users
        </Button>
      </Container>
    </Segment>
  );
}
