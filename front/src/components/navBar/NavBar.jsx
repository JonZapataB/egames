import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { HiMenu } from "react-icons/hi";
import { VscAccount } from "react-icons/vsc";
import { GrCart } from "react-icons/gr";

function NavScrollExample() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <NavDropdown title={<HiMenu />} id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">Nintendo Switch</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Xbox One</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Xbox Series X</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Play Station 4</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Play Station 5</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">Sobre Nosotros</NavDropdown.Item>
        </NavDropdown>
        <Navbar.Brand href="#">eEgames</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">
              <VscAccount />
            </Nav.Link>
            <Nav.Link href="#action2">
              <GrCart />
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
