import React from 'react'
import './ContactUs.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Base from "../components/Base";
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

const ContactUs=()=> {
    const navigate = useNavigate();
    const handleSubmit=()=>{
        toast.success('Feedback submitted Successfully');
        navigate("/");
    }
  return (
  <Base>
    <Row>
      <Col md={{
        size:8,
        offset:2
      }}>
      <Card color="light" data-aos='fade-up' className='text-center shadow my-3'>
        <CardHeader className='text-center '>
        <h1>Contact Us</h1>
        <p>If you have any questions or feedback, feel free to get in touch with us.</p>
        </CardHeader>
      <CardBody>
      <div className="contact-us-container">
      
       <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required rows="4"></textarea>
        </div>
        <button type="submit" onClick={handleSubmit}>Send Message</button>
      </form>
      
    </div>
      </CardBody>
    </Card>
      </Col>
    </Row>
  </Base>
  )
};

export default ContactUs;