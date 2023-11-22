import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { loadAllPosts } from '../services/post-service'
import { Row, Col, Pagination, PaginationItem, PaginationLink, Container, Button } from 'reactstrap'
import Post from './Post'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'
import { deletePostService } from '../services/post-service'
import 'aos/dist/aos.css'
import Aos from "aos"
import Search from './Search'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function NewFeed() {
    useEffect(()=>{
        Aos.init({
        duration:2000,
        offset:10
        })
    },[])

    

    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false,
        pageNumber: ''

    })

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        console.log("loading posts")
        console.log(currentPage)
        changePage(currentPage)

    }, [currentPage])


    const changePage = (pageNumber = 0, pageSize = 5) => {
        if (pageNumber > postContent.pageNumber && postContent.lastPage) {
            return
        }
        if (pageNumber < postContent.pageNumber && postContent.pageNumber == 0) {
            return
        }
        loadAllPosts(pageNumber, pageSize).then(data => {
            setPostContent({
                content: [...postContent.content, ...data.content],
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage,
                pageNumber: data.pageNumber
            })

            console.log(data);

        }).catch(error => {
            toast.error("Error in loading posts")

        })
    }



    function deletePost(post) {
        //going to delete post
        console.log(post)

        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='shadow p-3 mb-5 mx-auto bg-white rounded text-center'>
                  <h1 className='mx-5'>Confirm to Delete ?</h1> <hr />
                  <p className='mx-5' >Are you sure you want to delete this Post?
                    </p>
                  <Button color='primary' outline
                  onClick={onClose}>Cancel</Button>
                  <Button color='danger' outline
                  className='mx-4'
                    onClick={() => {
                        deletePostService(post.postId).then(res => {
                            console.log(res)
                            toast.success("post is deleled..")
                    
                            let newPostContents = postContent.content.filter(p => p.postId != post.postId)
                            setPostContent({ ...postContent, content: newPostContents })
                    
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

   

   


    const changePageInfinite = () => {
        console.log("page chagned")
        setCurrentPage(currentPage + 1)

    }

    return (
        <div className="container-fluid ">
            <Row>
                <Col md={
                    {
                        size: 12

                    }
                }>
                    {/* <Search></Search> */}
                    {/* <h6>Blogs Count  ( {postContent?.totalElements} )</h6> */}
                   
                   
                   
                    <InfiniteScroll
                        dataLength={postContent.content.length}
                        next={changePageInfinite}
                        hasMore={!postContent.lastPage}
                        loader={<h4 className='text-center my-5'>Loading posts...</h4>}
                        endMessage={
                            <p className='text-center mt-4'>
                                <b data-aos="fade-up"> You have seen it all</b>
                            </p>
                        }
                    >
                        {
                            postContent.content.map((post, index) => (
                                <div  >
                                <Post deletePost={deletePost} post={post} key={index} />
                                </div>
                            ))
                        }

                    </InfiniteScroll>







                    {/* <Container className='mt-3'>
                        <Pagination size='lg'>
                            <PaginationItem onClick={() => changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber == 0}>
                                <PaginationLink previous>
                                    Previous
                                </PaginationLink>
                            </PaginationItem>

                            {
                                [...Array(postContent.totalPages)].map((item, index) => (


                                    <PaginationItem onClick={() => changePage(index)} active={index == postContent.pageNumber} key={index}>
                                        <PaginationLink>

                                            {index + 1}

                                        </PaginationLink>
                                    </PaginationItem>

                                ))
                            }


                            <PaginationItem onClick={() => changePage(++postContent.pageNumber+1)} disabled={postContent.lastPage}>
                                <PaginationLink next>
                                    Next
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>

                    </Container> */}






                </Col>
                {/* <Col md={{size:3}}>
                    <Search></Search>
                    
                    
                </Col> */}
            </Row>
        </div>


    )
}

export default NewFeed