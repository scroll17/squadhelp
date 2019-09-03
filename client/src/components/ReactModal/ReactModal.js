import React from 'react';
import {Link} from "react-router-dom";

import {MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';

import { URL } from "../../api/baseURL";

function ModalPage() {

    const toggle = (type) => `modal${type}`;

    const fontStyle = {fontFamily: "Arial, sans-serif"};
    const colorStyle = {
        violet: {backgroundColor: "#a6c", borderColor: "#a6c"}
    };
    const linkStyle = {
        textDecoration: "none",
        color: "inherit",
        fontWeight: 400
    };

    return (
        <MDBContainer style={fontStyle}>
            <MDBModal isOpen={true} toggle={toggle(4)} size="lg">
                <MDBModalHeader>Let's Get Started</MDBModalHeader>
                <MDBModalBody className="text-center">
                    Please log in if you have one or register, so that we can launch your contests
                </MDBModalBody>
                <MDBModalFooter >
                    <MDBBtn color="primary"  style={colorStyle.violet}>
                        <Link to={URL.LOGIN} style={linkStyle}>Login</Link>
                    </MDBBtn>
                    <MDBBtn color="primary">
                        <Link to={URL.SIGN_UP} style={linkStyle}>Sign Up</Link>
                    </MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}

export default ModalPage;