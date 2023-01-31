import { useState } from "react";
import Loader from "./components/Loader";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(1);
    const response = await fetch("/api/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    const imageResponse = await response.json();
    setImageUrl(imageResponse.imageURL);
    setLoading(0);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container">
        <div className="text-center">
          <h1>Dall-e image generation</h1>
          <p>Dall-e image generation using openai api </p>
        </div>

        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  id="prompt"
                  name="prompt"
                  className="form-control"
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Press Enter to generate Images"
                />
              </div>
            </form>
          </div>
          <div className="col-sm-3"></div>
          {imageUrl !== "" ? (
            <img
              className="img-fluid img-cus"
              src={imageUrl}
              alt="image of dall-e"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
