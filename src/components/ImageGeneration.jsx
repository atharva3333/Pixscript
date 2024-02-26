import { useState } from "react";
import { PiCookingPotFill } from "react-icons/pi";

// eslint-disable-next-line react/prop-types
function ImageQueryComponent({ updateCredits, credits  }) {
  const [image, setImage] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showZeroCreditsMessage, setShowZeroCreditsMessage] = useState(false);

  const fetchData = async () => {
    try {

      
      if (credits <= 0) {
        setShowZeroCreditsMessage(true);
        return;
      }

      setLoading(true);
      const response = await query({ inputs: textInput });
      const result = await response.blob();
      setImage(URL.createObjectURL(result));

      updateCredits(1);
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(credits);

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
    <div className="flex justify-around items-center mt-10">

{showZeroCreditsMessage && (
  <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
  <div className='bg-[#155724] text-white p-4 rounded-md absolute w-[50%] h-[50%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
    <p className="flex justify-center items-center mt-10 mx-10 text-center font-medium text-gray-100 text-lg">😭Snap! Looks like you ran out of credits. Please make a payment to increase your credits</p>
    <p  className="absolute top-5 right-6 font-black cursor-pointer text-xl" onClick={()=>{setShowZeroCreditsMessage(false)}}>X</p>
  </div>
</div>


      )}
      <form onSubmit={handleSubmit}>
        <div className="gap-8 flex flex-col ">
          <textarea
            className="p-6 rounded-lg w-[500px] text-2xl h-[300px]"
            type="textarea"
            id="textInput"
            placeholder="Please describe your image"
            value={textInput}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="px-8 py-3 flex justify-center items-center rounded-md font-bold bg-[#155724] text-white"
          >
            Let&apos;s Cook your image{" "}
            <PiCookingPotFill className="ml-3 text-2xl" />
          </button>
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {image && !loading && (
        <div>
          <img
            src={image}
            className="w-[500px] rounded-lg shadow-2xl"
            alt="Resulting Image"
          />
          <p className="mt-6">
            Didn&apos;t see what you looking for? Try to specify more about the
            image
          </p>
        </div>
      )}
    </div>
  );
}

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  return response;
}

export default ImageQueryComponent;
