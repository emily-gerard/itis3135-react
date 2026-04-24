import { useEffect, useRef, useState } from "react";

function CatSlideshow() {
  const [cats, setCats] = useState([]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search?limit=10")
      .then((res) => res.json())
      .then((data) => setCats(data))
      .catch((err) => console.error("Error fetching cats:", err));
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev < cats.length - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const firstSlide = () => {
    setIndex(0);
  };

  const endSlide = () => {
    setIndex(cats.length - 1);
  };

  const playSlideshow = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setIndex((prev) => {
        if (prev >= cats.length - 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return prev;
        }
        return prev + 1;
      });
    }, 5000);
  };

  const stopSlideshow = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  if (cats.length === 0) {
    return <p>Loading slideshow...</p>;
  }

  return (
    <main className="slideshow-page">
      <h2>Cat Slideshow</h2>

      <div className="slideshow-container">
        <img
          src={cats[index].url}
          alt={`Cat ${index + 1}`}
          className="slideshow-image"
        />

        <p>
          Image {index + 1} of {cats.length}
        </p>

        <div className="slideshow-buttons">
          <button onClick={firstSlide}>First</button>
          <button onClick={prevSlide}>Previous</button>
          <button onClick={playSlideshow}>Play</button>
          <button onClick={stopSlideshow}>Stop</button>
          <button onClick={nextSlide}>Next</button>
          <button onClick={endSlide}>End</button>
        </div>
      </div>
    </main>
  );
}

export default CatSlideshow;
