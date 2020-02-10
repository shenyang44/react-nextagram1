import React, { useState, useEffect } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { FaCameraRetro, FaCommentDollar } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import LogInModal from './LogInModal';
import SignUpLink from './SignUpLink';

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div id='navBar'>
            <Navbar color="light" light expand="md">
                <NavbarBrand id='title' tag={Link} to='/'><FaCameraRetro style={{ color: '#f7198b' }} /> Nxtagram</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to='/profile'>bleh.</NavLink>
                        </NavItem>

                        <UncontrolledDropdown nav inNavbar>

                            {props.loggedIn ? <DropdownToggle nav caret >Logged In</DropdownToggle> : <DropdownToggle nav caret>
                                Log In / Sign Up
                            </DropdownToggle>}

                            {props.loggedIn ?
                                <DropdownMenu>
                                    <DropdownItem onClick={props.logOutPls}>
                                        Logout.
                                    </DropdownItem>

                                </DropdownMenu> :
                                <DropdownMenu right>
                                    <DropdownItem >
                                        <LogInModal props={props} />
                                    </DropdownItem>
                                    <DropdownItem>
                                        <SignUpLink props={props} />
                                    </DropdownItem>

                                    <DropdownItem divider />

                                    <DropdownItem>
                                        Secret button
                                    </DropdownItem>
                                </DropdownMenu>
                            }
                        </UncontrolledDropdown>

                    </Nav>
                </Collapse>

                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </Navbar>
        </div >
    );
}

export default NavBar;