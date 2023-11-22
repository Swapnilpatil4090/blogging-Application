import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import 'aos/dist/aos.css'
import Aos from "aos"

function CategorySideMenu() {

    useEffect(()=>{
        Aos.init({
        duration:2000,
        offset:100
        })
    },[])

    const [categories, setCategories] = useState([])

    useEffect(() => {
        loadAllCategories().then(data => {
            console.log("loading categories ")
            console.log(data)
            setCategories([...data])
        })
            .catch(error => {
                console.log(error);
                toast.error("error in loading categories")
            })
    }, [])


    return (
        <div >
            <ListGroup >
                <ListGroupItem tag={Link} to="/" action={true} className='border-0 shadow mb-1'>
                    All Blogs
                </ListGroupItem>
                {categories && categories.map((cat, index) => {
                    return (
                        <ListGroupItem tag={Link} to={'/categories/' + cat.categoryId} className='border-0 shadow mb-1 ' key={index} action={true}>
                            {cat.categoryTitle}
                        </ListGroupItem>
                    )
                })}
            </ListGroup>
        </div>
    )
}

export default CategorySideMenu