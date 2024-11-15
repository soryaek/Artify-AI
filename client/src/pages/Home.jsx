import React, { useState, useEffect } from 'react';
import { Loader, Card, FormField } from "../components/index.js";

const RenderCards = ({data, title}) => {
  if (data?.length > 0) {
    return data.map(post => <Card key={post._id} {...post}/>)
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase w-screen text-left">{title}</h2> 
  )
} 

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://artifyai.onrender.com/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse()); // Show new post at the top
        }
      } catch (error) {
        alertError('error');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);
  
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const currentSearchText = e.target.value;
        const searchResults = [...allPosts].filter((item) => {
          return item.name.toLowerCase().includes(currentSearchText.toLowerCase()) || 
          item.prompt.toLowerCase().includes(currentSearchText.toLowerCase())
        })
        setSearchResults(searchResults);
      }, 500)
    )
  }

  return (
    <section className='max-w-7xl mx-auto text-center'>
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Artify AI Collection</h1>
        <p className="mt-2 text-[#666e75] text-[14px]">Explore a gallery of creative and visually captivating images brought to life by Stable Diffusion AI</p>
      </div>

      <div className="mt-16">
      {/* labelName="Search posts" */}
        <FormField type="text" name="text" placeholder="Search posts" value={searchText} handleChange={handleSearchChange}/>
      </div>
      <div className="mt-10">
        {loading ? 
          <div className="flex justify-center items-center">
            <Loader />
          </div> : (
            <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-10 text-left">Showing results for <span className="text-[#222328]">"{searchText}"</span></h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? ( 
                <RenderCards data={searchResults} title="No search results found"/>) 
                : (
                  <RenderCards data={allPosts} title="No post found"/>
                )}
            </div>
            </>
          )
        }
      </div>
    </section>
  )
}

export default Home
