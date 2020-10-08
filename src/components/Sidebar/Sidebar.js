import React from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

const Sidebar = ({ user }) => {
    return (
        <div id="sidebar" className="col-12 col-md-3 col-xl-2">
            <div className="sidebar-container my-4 p-3">
                <h6>{user.username}</h6>
                <div style={{ display: 'inline-block' }}><AmplifySignOut /></div>

                <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link href="/home">Active<Badge variant="danger">9</Badge></Nav.Link>
                    <Nav.Link eventKey="link-1">Link</Nav.Link>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                    <Nav.Link eventKey="disabled" disabled>Disabled</Nav.Link>
                </Nav>

                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                </Form>


            </div>
        </div >
    );
};

export default Sidebar;