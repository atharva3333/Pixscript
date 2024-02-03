import { useState } from 'react';
import { PiCookingPotFill } from "react-icons/pi";
function ImageQueryComponent() {
  const [image, setImage] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await query({ "inputs": textInput });
      const result = await response.blob();
      setImage(URL.createObjectURL(result));
    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Clear previous image and initiate new search
    setImage(null);
    fetchData();
  };

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  return (
    <div className='flex justify-around items-center mt-10'>
      <form  onSubmit={handleSubmit}>
        <div className='gap-8 flex flex-col '>
        <textarea
         className='p-6 rounded-lg w-[500px] h-[300px]'
          type="textarea"
          id="textInput"
          placeholder='Please describe your image'
          value={textInput}
          onChange={handleInputChange}
        />
        <button type="submit" className='px-8 py-3 flex justify-center items-center rounded-md font-bold bg-[#155724] text-white'>Let&apos;s Cook your image <PiCookingPotFill  className='ml-3 text-2xl'/></button>
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {image && !loading && (
        <div>
          <img src={image} className='w-[500px] rounded-lg shadow-2xl' alt="Resulting Image" />
          <p className='mt-6'>Didn&apos;t see what you looking for? Try to specify more about the image</p>
        </div>
      )}
    </div>
  );
}

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  return response;
}

export default ImageQueryComponent;
