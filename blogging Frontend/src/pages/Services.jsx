import userContext from "../context/userContext"
import Base from "../components/Base"
import './services.css';
import 'aos/dist/aos.css'
import Aos from "aos"
import { useEffect } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

const Services = () => {

    useEffect(()=>{
        Aos.init({
        duration:2000,
        offset:100
        })
    },[])

    const servicesData = [
        { name: 'Java Full Stack Development Services', description: 'Welcome to our Java full stack development services! We are a team of experienced developers and engineers dedicated to helping businesses achieve their digital goals. With a focus on Java, we offer comprehensive full stack development services to build powerful, scalable, and secure web applications.'},
        { name: '.NET Web Development Services', description: 'Welcome to our .NET web development services! We are a team of experienced developers and engineers dedicated to helping businesses succeed in the digital world. Our expertise in .NET technologies empowers us to deliver high-quality, scalable, and secure web applications tailored to your specific needs.' },
        { name: 'MERN Stack Web Development Services', description: 'Welcome to our MERN stack web development services! We are a team of seasoned developers and engineers dedicated to helping businesses thrive in the digital landscape. Our expertise in the MERN stack empowers us to create top-quality, scalable, and secure web applications tailored to your unique needs.' },
        { name: 'Web Development and Design', description: 'Craft a compelling online presence with our custom web development and design services. From responsive websites to intuitive user interfaces, we create digital experiences that engage and convert.In the fast-paced digital landscape, your online presence is a crucial aspect of your brand identity. Our Web Development and Design service go beyond creating websites; we architect digital experiences that captivate your audience and drive measurable results.' },
        { name: 'Digital Marketing Strategy', description: 'Elevate your brand visibility and drive results with our digital marketing strategies. We offer a holistic approach, encompassing SEO, social media, content marketing, and more.In a crowded digital landscape, strategic and data-driven marketing is the key to standing out. Our Digital Marketing Strategy service is designed to propel your brand to new heights by leveraging the power of online channels, creating meaningful connections with your target audience, and achieving tangible business goals.' },
    ]
    
    return (
        <userContext.Consumer>
            {
                (object) => (

       <Base>
         <div className="service-page" >
            <header className="service-page-header">
                <h1 data-aos='flip-right'>Our Services</h1>
                <h5 data-aos='flip-right'>Discover what we offer....</h5>
            </header>
            <section className="service-list">
                {servicesData.map((service, index) => (
                <div className="service-item shadow" key={index} data-aos='fade-up'>
                    <h2>{service.name}</h2>
                    <p>{service.description}</p>
                </div>
                ))}
            </section>
            <Card data-aos='fade-up' className="text-center my-5 shadow rounded-0">
                <CardHeader ><h1>Why to Choose US?</h1></CardHeader>
                <CardBody>
                <h5>Proven Track Record: See measurable results from our successful projects.</h5>
                <h5>Innovation Hub: Stay ahead with the latest technological advancements.</h5>
                <h5>Client-Centric Approach: We prioritize your goals and tailor solutions to your needs.</h5>
                <h5>Comprehensive Solutions: Covering everything from development to ongoing support.</h5>
</CardBody>
            </Card>
        </div>
        </Base>
                )
            }
        </userContext.Consumer>
    )
}

export default Services