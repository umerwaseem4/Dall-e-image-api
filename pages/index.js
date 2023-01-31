import { useState } from "react";

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
    // setImageURL(imageResponse.imageURL)
    console.log(imageResponse);
    setImageUrl(imageResponse.imageURL);
    setLoading(0);
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <div className="container">
        <div className="text-center">
          <h1>Welcome to Dall-e image generation</h1>
          <p>Fill the below form to generate images</p>
        </div>

        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
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
          <div class="col-sm-3"></div>
          {imageUrl !== "" ? (
            <img className="img-fluid" src={imageUrl} alt="image of dall-e" />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

const Loading = () => {
  return (
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  );
};
