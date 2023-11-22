import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Base from '../components/Base'
import { Container, Row, Col,Button} from "reactstrap";
import CategorySideMenu from '../components/CategorySideMenu';
import { loadPostCategoryWise, deletePostService } from '../services/post-service';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Post from '../components/Post';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {FcEmptyTrash} from "react-icons/fc"

function Categories() {

    const [posts, setPosts] = useState([])

    const { categoryId } = useParams()
    useEffect(() => {
        console.log(categoryId);
        loadPostCategoryWise(categoryId).then(data => {
            setPosts([...data])
        })
            .catch(error => {
                console.log(error)
                toast.error("error in loading posts")
            })
    }, [categoryId])


    function deletePost(post) {
        //going to delete post
        console.log(post)

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
                
                        })
                            .catch(error => {
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

           <div >
           <Container className="mt-3" >
                <Row>
                    <Col md={2} className="mt-5" >
                        <CategorySideMenu />
                    </Col>
                    <Col md={10} >

                        {
                            posts && posts.map((post, index) => {
                                return (
                                    <Post deletePost={deletePost} key={index} post={post} />
                                )
                            })
                        }

                        {posts.length <= 0 ? <h1 className='text-center mt-5'><b><FcEmptyTrash></FcEmptyTrash></b> No post in this category</h1> : ''}
                    </Col>
                </Row>
            </Container>
           </div>


        </Base>
    )
}

export default Categories