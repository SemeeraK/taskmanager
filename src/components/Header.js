import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  return (
    <div id='b'  className="container-fluid">
       <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"><h3>DailyMate</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">
            <li className="nav-item my-3">
                            <Link to="/" className="nav-link ">
                                <img
                                    src="https://i.postimg.cc/5tGM7ZxG/home.png"
                                    alt=""
                                    style={{ height: '25px', cursor: 'pointer' }}
                                />
                                <p className="ms-2 text-black">Home</p>
                            </Link>
                        </li>

            </Nav.Link>
            <Nav.Link href="#action2">
            <li className="nav-item my-3">
                            <img
                                
                                src="https://i.postimg.cc/DyhMyVR5/add.png"
                                alt="Add"
                                style={{ height: '25px', cursor: 'pointer' }}
                            />
                            <p className="ms-2">Add</p>
                        </li>

            </Nav.Link>
            <Nav.Link href="#" >
            <li className="nav-item my-3">
<Link to={'/imp'} style={{textDecoration:'none'}}>
                                <img src="https://i.postimg.cc/FRmGDh96/file.png" alt="" style={{ height: '25px' }} />
                                <p className="ms-2">Important</p>
    
</Link>                        </li>

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
        
    </div>
  )
}

export default Header
