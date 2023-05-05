import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          Hubla
        </Menu.Item>
        <Menu.Item as={NavLink} to="/transactions" name="transactions" />
        <Menu.Item as={NavLink} to="/users" name="users" />
        <Menu.Item as={NavLink} to="/products" name="products" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/uploadfile"
            positive
            content="Insert transactions list"
          />
        </Menu.Item>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/users/create"
            positive
            content="Create User"
          />
        </Menu.Item>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/products/create"
            positive
            content="Create Product"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
