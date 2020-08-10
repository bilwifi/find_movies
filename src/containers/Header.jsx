import React from "react";
import {Row,Col,Nav,Navbar,NavDropdown, Form,FormControl,Button} from "react-bootstrap"
import { Icon } from 'semantic-ui-react'
export default function Header() {
  return (
    <div>
      <Navbar bg="transparent" expand="lg">
        <Navbar.Brand href="#home">Movies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2 " />
            <Button variant="outline-success"><Icon name="search"/></Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
