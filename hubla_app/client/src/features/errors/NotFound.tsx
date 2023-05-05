import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function NotFound() {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Ooop - Not Found
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/">
          Return to home
        </Button>
      </Segment.Inline>
    </Segment>
  );
}
