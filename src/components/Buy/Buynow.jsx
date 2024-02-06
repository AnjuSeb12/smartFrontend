
import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import instance from '../../axios';






function Buynow() {
    const [validated, setValidated] = useState(false);
    const {id} =useParams();
    const [product,setProduct]=useState({
        name:'',
       
    });
    useEffect(() => {
        const getUserDetails= async () => {
            try{
                const res= await instance.get(`api/v1/smartdetails/${id}`,{
                    withCredentials:true
                });
                if(!res.data.success){
                    navigate("/details");
                }
                setProduct({
                    name:res.data.user.name,
                   
                })
                // console.log(res.data.user);
            
            }catch(error){
                navigate("/details"); 

            } 

        }
        getUserDetails();


    })

    const [userFullname, setUserFullname] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userNumber, setUserNumber] = useState('');

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        else {
            try {
                let res = await instance.post('api/v1/buynowadd', {
                    productname:product,
                    fullname: userFullname,
                    address: userAddress,
                    number: userNumber

                },{
                    withCredentials:true
                });
                if (res.data.success) {
                    toast.success(res.data.message, {
                        autoClose: 2000
                    });
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    navigate('/');

                } else {
                    toast.error(res.data.message);

                }

            } catch (error) {
                toast.error(error.response.data.message);
            }

        }
        setValidated(true);
    }
    const handleUserFullname = (e) => {
        setUserFullname(e.target.value);

    }
    const handleUserAddress = (e) => {
        setUserAddress(e.target.value);

    }
    const handleUserNumber = (e) => {
        setUserNumber(e.target.value);
    }
    return (
        <Container>
            <Row>
                <Col className='topicColor'>Register</Col>
            </Row>
            <Row>
                <Col className='mt-3 mb-3'>
                    <ToastContainer />
                    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3">
                    <Form.Label>Product Name:</Form.Label>
                    <Form.Control type="text"  defaultValue={product.name} onChange={(e) => setProduct({...product,name:e.target.value})} required />
                    <Form.Control.Feedback type='invalid'>Please enter Fullname</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Enter Success</Form.Control.Feedback>
                </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>FullName:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Fullname" onChange={(e) => handleUserFullname(e)} required />
                            <Form.Control.Feedback type='invalid'>Please enter Fullname</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Enter Success</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address:</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter Address" onChange={(e) => handleUserAddress(e)} required />
                            <Form.Control.Feedback type='invalid'>Please Enter Address</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>successfully Entered</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Mobile no:</Form.Label>
                            <Form.Control type="num" placeholder="Enter Mobile no:" onChange={(e) => handleUserNumber(e)} required />
                            <Form.Control.Feedback type='invalid'>Please enter Mobile Number</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Successfully Entered</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>



                </Col>
            </Row>
        </Container>
    )
}

export default Buynow