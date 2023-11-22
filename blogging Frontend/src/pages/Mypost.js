import React, { useState,useEffect } from 'react'
import { getCurrentUserDetail } from '../auth';
import { toast } from 'react-toastify';
import Post from '../components/Post';
import { useParams } from 'react-router-dom';
import { deletePostService, loadPostUserWise } from '../services/post-service';
import Base from '../components/Base';
import { Button, Col, Container, Row } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const Mypost=()=> {
    const [user, setUser] = useState({});

  const [posts, setPosts] = useState([]);

  const { userId } = useParams();
  
  useEffect(() => {
    setUser(getCurrentUserDetail())
    loadPostData()
   },[])

 
     function loadPostData() {
        loadPostUserWise(userId).then(data => {
       setPosts([...data])
      })
        .catch(error => {
          console.log(error)
          // toast.error("error in loading user posts")
        })
    }

    function deletePost(post) {
        //going to delete post

        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='shadow p-3 mb-5 mx-auto bg-white rounded text-center'>
                <h1 className='mx-5'>Confirm to Delete ?</h1> <hr />
                <p className='mx-5' >Are you sure you want to Delete this Post?
                  </p>
                <Button color='primary' outline
                onClick={onClose}>Cancel</Button>
                <Button color='danger' outline
                className='mx-4'
                  onClick={() => {
                    deletePostService(post.postId).then(res => {
                      console.log(res)
                      toast.success("post is deleled..")
                      let newPosts = posts.filter(p => p.postId != post.postId)
                      setPosts([...newPosts])
                
                    })  .catch(error => {
                      console.log(error)
                      toast.error("error in deleting post")
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
    <Container>
      <Row>
        <Col md={{
          size:10,
          offset:1
        }}>
          <h4 className='my-3'> Total Posts : {posts.length}</h4>

{posts.map((post, index) => {
  return (
    <Post post={post} deletePost={deletePost} key={index} />
  )
})} <h1 className='text-center mt-5'>Loading posts....</h1>
        
        </Col>
      </Row>
    </Container>
  </Base>
  )
}

export default Mypost