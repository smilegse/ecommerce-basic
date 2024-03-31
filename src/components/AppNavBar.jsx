import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import Helper from "../utility/Helper.js";
import {Link, NavLink} from "react-router-dom";
import logo from "../assets/image/logo.png";

const AppNavBar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary bg-white shadow fixed-top">
            <Container fluid>
                <Navbar.Brand href="#"> <img alt="" className="nav-logo" src={logo}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        {
                            Helper.isLogin() &&
                            <NavLink className="nav-link" to="/cart-list">Cart List</NavLink>
                        }
                    </Nav>
                    {
                        Helper.isLogin()?(
                            <button className="btn btn-danger">Logout</button>
                        ): (<Link className="btn btn-danger" to="/login">Login</Link>)
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavBar;