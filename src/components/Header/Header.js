import React from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge'
import Navbar from 'react-bootstrap/Navbar'

const Header = ({ user }) => {
    return (
        <div id="header" >
            <Navbar bg="primary" variant="light" fixed='top'>
                <div id="logo" href="#home"></div>
                <Nav className="mr-auto">
                    <a style={{ display: 'inline-block' }} href="#">{user.username}<Badge variant="danger">9</Badge></a>
                    <div className="menu">
                        <div>i</div>
                        <div>i</div>
                        <div>i</div>
                    </div>
               </Nav>
            </Navbar>

        </div>
    );
};

export default Header;