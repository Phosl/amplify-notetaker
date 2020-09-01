import React from 'react';
import {AmplifySignOut } from '@aws-amplify/ui-react';

const Header = ({user}) => {
    return (
        <div>
            
            {user.username}
            <div style={{display:'inline-block'}}><AmplifySignOut /></div>
        </div>
    );
};

export default Header;