import React, { useState } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom'
import instance from '../../axios';



function Add() {
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantAddress, setRestaurantAddress] = useState('');
    const [restaurantNeighborhood, setRestaurantNeighborhood] = useState('');
    const [restaurantPhotograph, setRestaurantPhotograph] = useState(null);
    const navigate=useNavigate();
    const [validated, setValidated] = useState(false);

    const handleRestaurantName = (e) => {
        setRestaurantName(e.target.value);
    }
    const handleRestaurantAddress = (e) => {
        setRestaurantAddress(e.target.value);
    }
    const handleRestaurantNeighborhood = (e) => {
        setRestaurantNeighborhood(e.target.value);
    }
    const handlePhotograph = (e) => {

        setRestaurantPhotograph(e.target.files[0]);
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            const formData = new FormData();
            formData.append("name", restaurantName);
            formData.append("details", restaurantAddress);
            formData.append("amount", restaurantNeighborhood);
            formData.append("photograph", restaurantPhotograph);
            try {
                const res = await instance.post('api/v1/smartadd', formData, {
                 
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                if (res.data.success) {
                    toast.success(res.data.message, {
                        autoClose: 2000
                    });
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    navigate('/');

                } else {
                    toast.error(res.data.message);

                }
            }
            catch(error){
                toast.error(error.response.data.message)
            }
          

           
        }
        setValidated(true);
    }
  return (
    <Container>
    <Row>
        <Col className='mt-3 mb-3'>
            <ToastContainer position='top-right' />
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Restaurant Name:</Form.Label>
                    <Form.Control type="text" placeholder="Sample Restaurant Name" onChange={(e) => handleRestaurantName(e)} required />
                    <Form.Control.Feedback type='invalid'>Please enter restaurant name</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Restaurant name looks good</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Restaurant Address:</Form.Label>
                    <Form.Control type="text" placeholder="Sample Restaurant Address" onChange={(e) => handleRestaurantAddress(e)} required />
                    <Form.Control.Feedback type='invalid'>Please enter restaurant address</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>successfully Entered</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Restaurant Neighborhood:</Form.Label>
                    <Form.Control type="text" placeholder="Sample Restaurant Neighborhood" onChange={(e) => handleRestaurantNeighborhood(e)} required />
                    <Form.Control.Feedback type='invalid'>Please enter restaurant name</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Successfully Entered</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Restaurant Photograph:</Form.Label>
                    <Form.Control type="file" onChange={(e) => handlePhotograph(e)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Restaurant
                </Button>
            </Form>




        </Col>
    </Row>
</Container>
  )
}

export default Add