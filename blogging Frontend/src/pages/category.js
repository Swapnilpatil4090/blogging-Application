import React from 'react'
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Label,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Button,
  ListGroup,
  ListGroupItem,
  CardFooter, 
} from "reactstrap";
import Base from "../components/Base";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import { useContext ,useEffect} from "react";
import 'aos/dist/aos.css'
import Aos from "aos"
import { addCategory, deleteCategory, loadAllCategories } from '../services/category-service';
import { getCurrentUserDetail, isLoggedIn } from '../auth';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const Category=()=> {
  
    useEffect(()=>{
        Aos.init({
        duration:2000,
        offset:30
        })
    },[])
    
   
      const navigate = useNavigate();
    
      const [category, setCategory] = useState({
        categoryTitle: "",
        categoryDescription: "",
      });
    
      const handleChange = (event, field) => {
        let actualValue = event.target.value;
        setCategory({
          ...category,
          [field]: actualValue,
        });
      };
    
      const handleReset = () => {
        setCategory({
          categoryTitle: "",
          categoryDescription: "",
        });
      };
    
      const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(category);
        //validation
        if (
          category.categoryTitle.trim() == "" &&
          category.categoryDescription.trim() == ""
        ) {
          toast.error("category and description is required !!");
          return;
        }
    
        //submit the data to server 
        addCategory(category)
          .then((data) => {
            console.log(data);
            toast.success("category Added Successfully");

            setCategory({
              categoryTitle: "",
              categoryDescription: "",
            });
            

          })
          .catch((error) => {
            console.log(error);
            if (error.response.status == 400 || error.response.status == 404) {
              toast.error(error.response.data.categoryTitle);
              toast.error(error.response.data.categoryDescription);
            } else {
              toast.error("Something went wrong  on sever !!");
            }
          });
      };

      const [categories, setCategories] = useState([])

      useEffect(() => {
          loadAllCategories().then(data => {
              console.log("loading categories ")
              console.log(data)
              setCategories([...data])
          })
              .catch(error => {
                  console.log(error);
                  toast.error("error in loading categories")
              })
      }, [])

      const handleDelete=(cat)=>{
          
           
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='shadow p-3 mb-5 mx-auto bg-white rounded text-center'>
                <h1 className='mx-5'>Confirm to Delete ?</h1> <hr />
                <p className='mx-5' >Are you sure you want to Delete this Category?
                  </p>
                <Button color='primary' outline
                onClick={onClose}>Cancel</Button>
                <Button color='danger' outline
                className='mx-4'
                  onClick={() => {
                    deleteCategory(cat.categoryId).then(res => {
                      console.log(res)
                      toast.success("Category is deleled..")
                    
                    })  .catch(error => {
                      console.log(error)
                      toast.error("error in deleting Category")
                    })
                    onClose();
                  }}
                >
                   Delete
                </Button>
              </div>
            );
          }
        });
      }
    
      return (
        <Base>
          <Container className=''>
            <Row className="mt-5">
              <Col
                sm={{
                  size: 10,
                  offset: 1,
                }}
              >
                <Card color="light"className='shadow' data-aos='fade-up' >
                  <CardHeader className='text-center'>
                    <h3>Add Category !!</h3>
                  </CardHeader>
    
                  <CardBody className='shadow'>
                    <Form onSubmit={handleFormSubmit}>
                      {/* Email field */}
    
                      <FormGroup>
                        <Label for="categoryTitle">Enter Category Title</Label>
                        <Input
                        minLength={4}
                        maxLength={60}
                          type="text"
                          id="category"
                          value={category.categoryTitle}
                          onChange={(e) => handleChange(e, "categoryTitle")}
                        />
                      </FormGroup>
    
                      {/* password field */}
    
                      <FormGroup>
                        <Label for="categoryDescription">Enter Category Discription</Label>
                        <Input
                        minLength={10}
                        maxLength={60}
                          type="textarea"
                          id="description"
                          value={category.categoryDescription}
                          onChange={(e) => handleChange(e, "categoryDescription")}
                        />
                      </FormGroup>
    
                      <Container className="text-center">
                        <Button className='shadow' color="primary" outline>
                          Add Category
                        </Button>
                        <Button
                          onClick={handleReset}
                          className="ms-2 shadow rounded"
                          outline
                          color="danger"
                        >
                          Reset
                        </Button>
                      </Container>
                    </Form>
                  </CardBody>
                  
                </Card>
              </Col>
            </Row>
            
            <Row className='mt-3'>
              <Col
              sm={{
                size: 8,
                offset:2,
              }}
              >
                 <div  >
                 <h3 data-aos='fade-up'>Total categories : {categories.length}</h3>
                      <ListGroup data-aos='fade-up'>
                          {categories && categories.map((cat, index) => {
                              return (
                                  <ListGroupItem data-aos='fade-up' className='border-0 shadow  mt-2 rounded' key={index} action={true}>
                                    <Row>
                                      <Col sm={{
                                        size:10
                                      }}>
                                        <h4 className='text-center'>{cat.categoryTitle}</h4>
                                      <p className='text-center' >{cat.categoryDescription}</p>
                                      </Col>
                                      <Col className='py-5' sm={{
                                        size:1
                                      }}>
                                       <Button outline className=" my-auto text-center shadow rounded ms-2" color='danger' onClick={(event)=>{handleDelete(cat)}} >Delete</Button> 
                                      </Col>
                                    </Row>
                                  </ListGroupItem>
                              )
                          })}
                      </ListGroup>
                  </div>
              </Col>
            </Row>
            
                                      

          </Container>
           
          <div className='mt-5'>
                <Card>
                  <CardFooter className='border-0 shadow-lg mt-1 text-center'>
                    End of Page...
                  </CardFooter>
                </Card>
              </div>
        </Base>
      );
};

export default Category;