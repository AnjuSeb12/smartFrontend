

import React, { useState } from 'react';
import { Container, Col, Row, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../axios';


function Signup() {
    const [validated, setValidated] = useState(false);
    const [userFullname,setUserFullname] = useState('');
    const [userEmail,setUserEmail] = useState('');
    const [userPassword,setUserPassword] = useState('');
    const navigate = useNavigate();
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        else{
            try{
                let res = await instance.post('api/v1/smartregister',{
                fullname:userFullname,
                email:userEmail,
                password:userPassword
            });
            
            if(res.data.success){
                toast.success(res.data.message,{
                    autoClose:2000
                });
                await new Promise((resolve) => setTimeout(resolve,2000));
                navigate('/');

            }else{
                toast.error(res.data.message);

            }

            } catch(error){
                toast.error(error.response.data.message);
            }
           
        }
        setValidated(true);
        }
        const handleUserFullname = (e) => { 
            setUserFullname(e.target.value);

        }
        const handleUserEmail = (e) => { 
            setUserEmail(e.target.value);

        }
        const handleUserPassword = (e) => { 
            setUserPassword(e.target.value);
        }
  return (
    <Container>
    <Row>
        <Col className='topicColor'>Signup</Col>
    </Row>
    <Row>
        <Col className='mt-3 mb-3'>
            <ToastContainer />
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>FullName:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Fullname" onChange={(e) => handleUserFullname(e)} required />
                    <Form.Control.Feedback type='invalid'>Please enter Fullname</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Enter Success</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" onChange={(e) => handleUserEmail(e)} required />
                    <Form.Control.Feedback type='invalid'>Please Enter Valid Email</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>successfully Entered</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" onChange={(e) => handleUserPassword(e)} required />
                    <Form.Control.Feedback type='invalid'>Please enter password</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Successfully Entered</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>



        </Col>
    </Row>
</Container>
  )
}

export default Signup