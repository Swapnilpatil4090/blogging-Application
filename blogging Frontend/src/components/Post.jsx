import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../auth'
import userContext from '../context/userContext'
import { BASE_URL } from '../services/helper'
import 'aos/dist/aos.css'
// import Aos from "aos"
function Post({ post = { id: -1, title: "This is default post title", content: "This is default post content" }, deletePost }) {

    // useEffect(()=>{
    //     Aos.init({
    //     duration:1000,
    //     offset:80
    //     })
    // },[])


    const userContextData = useContext(userContext)
    const [user, setUser] = useState(null)
    const [login, setLogin] = useState(null)
    useEffect(() => {
        setUser(getCurrentUserDetail())
        setLogin(isLoggedIn())
    }, [])
  
    const printDate = (numbers) => {

        return new Date(numbers).toLocaleDateString()
    }

    return (


        <Card className='shadow mt-4 ' > 
            <CardBody>
            <CardText> Posted By <b>{post.user.name}</b> on <b>{printDate(post.addedDate)} </b> </CardText>
                <h3 className='text-center '>{post.title}</h3> <hr />
                <div className=" mt-4 text-center mx-auto " style={{ maxWidth: '50%' }}>
                 <img  className="img-fluid text-center " src={BASE_URL + '/posts/image/' + post.imageName} alt="" />
                 </div> 
                <CardText className='text-center mx-5 mt-4' dangerouslySetInnerHTML={{ __html: post.content.substring(0, 10000) + "...." }}>

                </CardText>
                    
                <div className='text-center mx-4' >
                    <Link className='btn btn-primary border-0' to={'/posts/' + post.postId}>Read More</Link>
                    {userContextData.user.login && (user && user.userId === post.user.userId ? <Button onClick={(event) => deletePost(post)} color='danger' className="ms-2">Delete</Button> : '')}
                    {userContextData.user.login && (user && user.userId === post.user.userId ? <Button tag={Link} to={`/user/update-blog/${post.postId}`} color='warning' className="ms-2">Update</Button> : '')}

                </div>
            </CardBody>
        </Card>

    )
}

export default Post