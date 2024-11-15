import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview, share } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isMobile = window.matchMedia("(max-width: 600px)").matches;

const alertError = (errorMessage) => {
  toast.error(errorMessage, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      fontSize:'14px',
      height: '20px',
      width: !isMobile ? '300px' : 'calc(100% - 20px)',
      textAlign: 'center',
    }
  });
}

const CreatePost = () => {
  const navigate = useNavigate(); // allow us to navigate back to homepage once the post is created
  const [form, setForm] = useState({
    name: '',
    prompt:'',
    photo:'',
  })

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
  
        const response = await fetch('https://artifyai.onrender.com/api/v1/stable-diffusion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: form.prompt,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.image) {
          setForm({
            ...form,
            photo: data.image, // base64 image data URL returned from the server
          });
        } else {
          throw new Error("Image data not found in the response");
        }
      } catch (error) {
        alertError(error.message || "An unexpected error occurred.");
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alertError('Please enter a prompt!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch("https://artifyai.onrender.com/api/v1/post", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify(form)
        })

        await response.json();
        navigate('/');
      } catch (error) {
        alertError(error);
      } finally {
        setLoading(false);
      }
    } else {
      alertError('Please enter prompt!');
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form, 
      [e.target.name]: e.target.value
    })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({
      ...form,
      prompt: randomPrompt
    })
  }

  return (
    <section className="max-w-7xl mx-auto">
       <div className="text-center">
        <h1 className="font-extrabold text-[#222328] text-[32px]">Welcome to Artify AI</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[700px]">From Imagination to Image - Let AI Bring Your Ideas to Life</p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Add Your Name Below:"
            type="text"
            name="name"
            placeholder=""
            value={form.name}
            handleChange={handleChange}
          />
           <FormField
            labelName="Create Your Image Below:"
            type="text"
            name="prompt"
            placeholder="Ex: A 3D render of a rainbow colored hot air balloon flying above a reflective lake"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 
            text-gray-900 text-sm rounded-lg focus:ring-blue-500 
            focus:border-blue-500 w-64 p-3 h-64 flex justify-center 
            items-center"
          >
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain"/>
            ): (
              <img src={preview} alt="preview" className="w-9/12 h-9/12 object-container opacity-40" />
            )}
          
            {generatingImg && 
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0, 0, 0, 0.5] rounded-lg">
                <Loader />
              </div>
            }
          </div>
        </div>
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-5">
          <button 
            type="button" 
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full h-10 sm:w-auto px-5 py-2.5 text-center"
          >
            { generatingImg ? 'Generating...' : 'Generate'}
          </button>
          <button type="submit" className="text-center flex items-center justify-center space-x-2 gap-2 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full h-10 sm:w-auto px-5 py-2.5">
              {loading ? (
                'Sharing...'
              ) : (
                <>
                  Share with Artify AI Collection <img className="w-4 h-4 filter invert" src={share} alt="Share icon" />
                </>
              )}
            </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
