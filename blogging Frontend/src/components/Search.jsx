import React, { useState } from 'react'
import { Button, Container, Form, Input } from 'reactstrap'
import { searchPost } from '../services/post-service';
import Post from './Post';
import { toast } from "react-toastify";
const Search=()=> {

    const [postContent, setPostContent] = useState({
      content:[]
    })

   const[keyword,setKeyword]=useState({
    word:" ",
   });

   const handleSearch=()=>{
    console.log(keyword?.word)
    searchPost(keyword?.word).then((data)=>{
      console.log(data)
    setPostContent({
      content:[...postContent.content, ...data.content]
    })
       }).catch((error) => {
        console.log(error);
        if (error.response.status == 400 || error.response.status == 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong  on sever !!");
        }
      });
        
   
   }

   const handleChange=(event,feild)=>{
        setKeyword({
            ...keyword.word, 
            [feild] : event.target.value,
        })
   }

  return (
    <div>
    <Container  >
        <Input type='search'
         placeholder='Search Post By Title..'
         id='key'
         value={keyword.word}
         onChange={(e) => handleChange(e, "word")}
         ></Input>
        <Button className='mt-2' type='submit' onClick={handleSearch} color='primary'> Search</Button>
    </Container>

                   {
                       postContent.content.map((post, index) => (
                        <div data-aos="zoom-in-up" >
                        <h6>{post.title}</h6>
                        <p>{post.content}</p>
                        </div>
                    ))
                    }
       
                                

    </div>
  )
}

export default Search