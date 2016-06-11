import React, { Component } from 'react';

import { Navbar, NavItem, Nav, MenuItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

class Header extends Component{
  render() {
    return (
      <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Fête de la musique de Genève
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <LinkContainer to={{ pathname: '/program' }}>
              <NavItem>Program</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/about' }}>
              <NavItem>About</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
    )
  }
}

export default Header
