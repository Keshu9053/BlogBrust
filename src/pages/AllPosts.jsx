import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import LoadingSpinner from '../components/LoadingSpinner';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading,setLoading] = useState(false)


    useEffect(() => {

        const fetchData = async ()=>{
            setLoading(true)
            try {
                await appwriteService.getPosts([]).then((posts) => {
                    if (posts) {
                        setPosts(posts.documents)
                    }
                })
            }

            catch(error) {
                console.log(`error in home ${Error}`)
            }
            setLoading(false)
        }

        fetchData();
    }, [])

    
    return (
        loading ? (<LoadingSpinner/>) 
        : 
        (
            <div className='w-full py-8'>
            <Container>
                {
                    loading ? (<LoadingSpinner/>) 
                    : 
                    (
                        <div className='flex flex-wrap lg:flex-row md:flex-col md:mx-auto flex-col'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 md:mx-auto lg:w-1/4 md:w-2/4' >
                                <PostCard {...post} />
                            </div>
                        ))}
                        </div>
                    )
                }
            </Container>
        </div>
        )
    )
}

export default AllPosts