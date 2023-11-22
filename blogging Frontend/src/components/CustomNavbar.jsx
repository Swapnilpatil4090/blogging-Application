import { useContext } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink as ReactLink, useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText, Button } from "reactstrap";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../auth";
import userContext from "../context/userContext";
import {BsInstagram, BsYoutube,BsFacebook,BsLinkedin} from "react-icons/bs"
import {VscFeedback} from "react-icons/vsc";
import {FaUserCircle,FaBlog} from "react-icons/fa"
import {ImHome} from "react-icons/im"
import {MdLogin, MdDashboardCustomize} from "react-icons/md"
import {FcAbout,FcServices} from "react-icons/fc"
import {FiUserPlus,FiLogOut} from "react-icons/fi"
import {BiSolidAddToQueue} from "react-icons/bi"
import {MdViewTimeline} from "react-icons/md"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const CustomNavbar = (args) => {
    const userContextData = useContext(userContext)
    let navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(undefined)
    
  
    useEffect(() => {

        setLogin(isLoggedIn())
        setUser(getCurrentUserDetail())
        
    }, [login])

    

    const logout = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='shadow p-3 mb-5 mx-auto bg-white rounded text-center'>
                  <h1 className='mx-5'>Confirm to Logout</h1> <hr />
                  <p className='mx-5' >Are you sure you want to Logout?
                    </p>
                  <Button color='primary' outline
                  onClick={onClose}>Cancel</Button>
                  <Button color='danger' outline
                  className='mx-4'
                    onClick={() => {
                        doLogout(() => {
                            //logged out
                            setLogin(isLoggedIn())
                            userContextData.setUser({
                                data: null,
                                login: false
                            })
                            toast.success("You have been successfully logged out!");
                            navigate("/")
                            
                        })
                      onClose();
                    }}
                  >
                    Logout
                  </Button>
                </div>
              );
            }
          });

       
    }


    return (
        <div className="navBackground " >
            <Navbar
                // color="warning"
                light
                expand="md"
                //  fixed="top"
                // className="px-5 text-center"
                // container="fluid"
               {...args}
            >
                <NavbarBrand className="text-center mx-4" tag={ReactLink} to="/">
                   <h5><ImHome size={30} color="dark" className="text-center "></ImHome></h5>
                </NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

                <Collapse isOpen={isOpen} navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >

                       {/* <NavItem className="mx-1 text-centre">
                            <NavLink tag={ReactLink} to="/" >
                             <h6><MdViewTimeline color="dark" size={20} ></MdViewTimeline> <b>Feeds</b></h6>
                            </NavLink>
                        </NavItem> */}

                        <NavItem className="mx-2 text-center">
                            <NavLink tag={ReactLink} to="/about" >
                              <h6><FcAbout color="dark" size={25}></FcAbout> <b> About</b></h6>
                            </NavLink>
                        </NavItem>
                        <NavItem className="mx-2 text-center">
                            <NavLink tag={ReactLink} to="/services" >
                             <h6> <FcServices color="dark" size={25}></FcServices>  <b>Services</b></h6>
                            </NavLink>
                        </NavItem>



                        <UncontrolledDropdown className="mx-2 text-center"
                            inNavbar
                            nav
                        >
                            <DropdownToggle
                                caret
                                nav
                                className="text-center"
                            >
                              <b size={20}>More</b>
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem tag={ReactLink} to="/contact">
                                 <VscFeedback color="dark" size={20}></VscFeedback>   Feedback
                                </DropdownItem>

                                <DropdownItem divider />

                                <DropdownItem >
                                <a href="https://www.facebook.com/"><BsFacebook color="dark" size={20}></BsFacebook> Facebook</a>
                                </DropdownItem>

                                
                                <DropdownItem>
                                <a href="https://www.youtube.com/"><BsYoutube color="dark" size={20}></BsYoutube> Youtube </a>
                                </DropdownItem>

                                <DropdownItem>
                                <a href="https://www.instagram.com/"><BsInstagram color="dark" size={20}></BsInstagram>  Instagram</a> 
                                </DropdownItem>
                                
                                <DropdownItem>
                                <a href="https://www.linkedin.com/"><BsLinkedin color="dark" size={20}></BsLinkedin>  LinkedIn </a>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>


                    <Nav navbar>

                        {
                            login && (

                                <>  
                                  { user.roles[0].id===1 &&
                                    <NavItem className="text-center mx-2">
                                        <NavLink tag={ReactLink} to={`/user/category/${user.userId}`} >
                                         <h6><BiSolidAddToQueue color="dark" size={25}></BiSolidAddToQueue> <b>Add category</b> </h6>
                                        </NavLink>
                                    </NavItem>
                                  }
                                    <NavItem className="text-center mx-2">
                                        <NavLink tag={ReactLink} to={`/user/myposts/${user.userId}`} >
                                         <h6><FaBlog color="dark" size={23}></FaBlog> <b>MyBlogs</b> </h6>
                                        </NavLink>
                                    </NavItem>


                                    <NavItem className="text-center mx-2">
                                        <NavLink tag={ReactLink} to={`/user/profile-info/${user.userId}`} >
                                         <h6><FaUserCircle color="dark" size={25}></FaUserCircle> <b>Profile</b></h6> 
                                        </NavLink>
                                    </NavItem>



                                    <NavItem className="text-center mx-2">
                                        <NavLink tag={ReactLink}  to={`/user/dashboard/${user.userId}`} >
                                            <h6><b> <MdDashboardCustomize size={25}></MdDashboardCustomize> {user.name}</b></h6>
                                        </NavLink>
                                    </NavItem>

                                    <NavItem className="text-center mx-2">
                                        <NavLink  onClick={logout} >
                                          <h6><FiLogOut color="dark" size={25}></FiLogOut> <b> Logout</b></h6>
                                        </NavLink>
                                    </NavItem>
                                </>



                            )
                        }

                        {
                            !login && (
                                <>
                                    <NavItem className="text-center" >
                                        <NavLink tag={ReactLink} to="/login" >
                                        <h6> <MdLogin color="dark" size={25}></MdLogin>  <b>Login</b></h6>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="mx-3 text-center">
                                        <NavLink tag={ReactLink} to="/signup" >
                                         <h6> <FiUserPlus color="dark" size={25}></FiUserPlus>  <b>Signup</b></h6>
                                        </NavLink>
                                    </NavItem>
                                   
                                </>
                            )
                        }

                    </Nav>





                </Collapse>
            </Navbar>
        </div>

    )
}

export default CustomNavbar;