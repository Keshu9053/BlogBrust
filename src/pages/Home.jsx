import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import authService from '../appwrite/auth';
import {Container, PostCard} from '../components'
import LoadingSpinner from '../components/LoadingSpinner';


function Home() {
    const [posts, setPosts] = useState([])
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        
        const fetchData = async ()=>{
            setLoading(true)
            try { 
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
    
    
                await appwriteService.getPosts().then((posts) => {
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

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap ">
                        {
                            loading ? 
                            (
                                <LoadingSpinner className='mx-auto'/>
                            ) : 
                            (
                                <div className="p-2 w-full">
                                {
                                    (user && posts.length === 0) ?  
                                    (<h1 className="text-2xl opacity-50 font-bold"> Please Insert Your Blogs </h1>) 
                                    : 
                                    (<h1 className="text-2xl opacity-50 font-bold"> Please Login First </h1>)
                                }
                                </div>
                            )
                        }
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap lg:flex-row md:flex-col md:mx-auto flex-col'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 md:mx-auto lg:w-1/4 md:w-2/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home