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
  Button, CardFooter, NavLink,
} from "reactstrap";
import Base from "../components/Base";
import { loginUser } from "../services/user-service";
import { doLogin, getCurrentUserDetail } from "../auth";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import { useContext ,useEffect} from "react";
import 'aos/dist/aos.css'
import Aos from "aos"

const Login = () => {
  
  useEffect(()=>{
    Aos.init({
    duration:2000,
    offset:100
    })
},[])


  const userContxtData = useContext(userContext);

  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);
    //validation
    if (
      loginDetail.username.trim() == "" ||
      loginDetail.password.trim() == ""
    ) {
      toast.error("Username or Password  is required !!");
      return;
    }

    //submit the data to server to generate token
    loginUser(loginDetail)
      .then((data) => {
        console.log(data);

        //save the data to localstorage
        doLogin(data, () => {
          console.log("login detail is saved to localstorage");
          //redirect to user dashboard page
          userContxtData.setUser({
            data: data.user,
            login: true,
          });
          const user = getCurrentUserDetail();
          navigate(`/user/dashboard/${user.userId}`);
        });

        toast.success("Login Success");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 400 || error.response.status == 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong  on sever !!");
        }
      });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-5">
          <Col
            sm={{
              size: 6,
              offset: 3,
            }}
          >
            <Card color="light" data-aos='fade-up' className="shadow" >
              <CardHeader>
                <h3>Login Here !!</h3>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  {/* Email field */}

                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="text"
                      id="email"
                      value={loginDetail.username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </FormGroup>

                  {/* password field */}

                  <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input
                      type="password"
                      id="password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="primary" outline>
                      Login
                    </Button>
                    <Button
                      onClick={handleReset}
                      className="ms-2"
                      outline
                      color="danger"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
              <CardFooter className="text-center"  >
                <h6>Don't have account ? <Link to={"/signup"}>Register</Link></h6>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Login;
