import userContext from "../context/userContext";
import Base from "../components/Base";
import './about.css';
import 'aos/dist/aos.css'
import Aos from "aos"
import { useEffect } from "react";

const About = () => {
  useEffect(()=>{
    Aos.init({
      duration:2000,
      offset:150
    })
  },[])

  const teamMembers = [
    { name: 'Swapnil patil', role: 'full stack developer', image: 'swap.jpg' },
    { name: 'Ketan samrit', role: 'full stack developer', image: 'ketan.jpg' },
    { name: 'vishwanth devarde', role: 'full stack developer', image: 'vishwa.jpg' },
    { name: 'sourabh bagrekar', role: 'full stack developer', image: 'sourabh.jpg' },
  ];


  const socialLinks = [
    { platform: 'Twitter', url: 'https://twitter.com/yourwebsite' },
    { platform: 'Facebook', url: 'https://facebook.com/yourwebsite' },
    { platform: 'Instagram', url: 'https://instagram.com/yourwebsite' },
  ];

  return (
    <userContext.Consumer>
      {(object) => (
        <Base>
           <div className="about-section">
           <div className="about-content">
        <h2 data-aos="flip-left">About Us</h2>
        <p data-aos="flip-right" >
          Welcome to our blogging website! We are passionate about sharing
          knowledge, ideas, and stories with our readers. Our team of writers
          is dedicated to providing you with high-quality content on a wide
          range of topics. Whether you're a seasoned expert or just starting
          your journey, we have something for everyone.
        </p>
        <div className="team-members">
          <h3 data-aos="flip-left">Meet Our Team</h3>
          <div className="team-list">
            {teamMembers.map((member, index) => (
              <div className="team-member shadow py-1 px-1 mt-2 " key={index} data-aos="fade-up">
                <img className="shadow mt-4" src={member.image} alt={member.name} />
                <p className="mt-3">{member.name}</p>
                <span>{member.role}</span>
              </div>
            ))}
          </div>
        </div>
       
        <div className="social-media shadow px-5 py-2 mt-4" data-aos="fade-up">
          <h3 className="">Connect with Us</h3>
          <ul>
            {socialLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="contact shadow mx-5  py-4" data-aos="fade-up">
          <h3>Contact Us</h3>
          <p>If you have any questions or inquiries, please feel free to contact us at swapnilpatil4090@gmail.com</p>
        </div>
      </div>
    </div>
        </Base>
      )}
    </userContext.Consumer>
  );
};

export default About;
