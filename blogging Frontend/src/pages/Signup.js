
import { useState , useEffect} from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { Link, useNavigate } from "react-router-dom";
import 'aos/dist/aos.css'
import Aos from "aos"

const Signup = () => {
  useEffect(()=>{
    Aos.init({
    duration:2000,
    offset:100
    })
    },[])
  
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  // handle change
  const handleChange = (event, property) => {
    //dynamic setting the values
    setData({ ...data, [property]: event.target.value });
  };

  //reseting the form
  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };
  const navigate = useNavigate();
  //submit the form
  const submitForm = (event) => {
    event.preventDefault();

   
    signUp(data)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        toast.success("User is registered successfully !! Please Login ");
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
        navigate("/login")
      })
      .catch((error) => {
        console.log(error);
        toast.error("User Not Registered")
        //handle errors in proper way
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  return (
    <Base>
      <Container className="mb-5">
        <Row className="my-4">
          {/* { JSON.stringify(data) } */}

          <Col sm={{ size: 8, offset: 2 }}>
            <Card color="light" data-aos='fade-up' className="shadow">
              <CardHeader>
                <h3> Fill Information to Register !!</h3>
              </CardHeader>

              <CardBody>
                {/* creating form */}

                <Form onSubmit={submitForm}>
                  {/* Name field */}
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={
                        error.errors?.response?.data?.name ? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>

                  {/* email field */}
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter here"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={
                        error.errors?.response?.data?.email ? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>

                  {/* password field */}
                  <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input
                      type="password"
                      placeholder="Enter here"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={
                        error.errors?.response?.data?.password ? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>

                  {/* about field */}
                  <FormGroup>
                    <Label for="about">Write something about yourself</Label>
                    <Input
                      type="textarea"
                      placeholder="Enter here"
                      id="about"
                      style={{ height: "75px" }}
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={
                        error.errors?.response?.data?.about ? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.about}
                    </FormFeedback>
                  </FormGroup>

                  <Container className="text-center">
                    <Button outline color="primary">
                      Register
                    </Button>
                    <Button
                      onClick={resetData}
                      color="danger"
                      type="reset"
                      className="ms-2"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
              <CardFooter className="text-center">
                <h6>Already have account ? <Link to={"/login"}>Login here</Link></h6>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
     
    </Base>
  );
};

export default Signup;
