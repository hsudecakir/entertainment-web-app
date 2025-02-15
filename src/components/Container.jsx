import { useContext, useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import { DataContext, StepContext } from "../App";
import FilteredMovies from "./FilteredMovies";

export default function Container(){
  const { step } = useContext(StepContext);
  const { data, setData } = useContext(DataContext);

  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      slider.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging, startX, scrollLeft]);

  function handleMouseDown(e){
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    document.addEventListener("mouseup", handleEnd);
  };

  function handleMouseMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  }

  function handleTouchStart(e){
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  function handleEnd(){
    setIsDragging(false);
    document.removeEventListener("mouseup", handleEnd);
  };

  const [ inputvalue, setInputValue ] = useState('');

  function toggleBookmark(title){
    let selectedItem = data.find(x => x.title === title);
    selectedItem = {
      ...selectedItem,
      isBookmarked: !selectedItem.isBookmarked
    }
    const updatedData = data.map(x => x.title === title ? selectedItem : x);
    setData(updatedData);
    localStorage.data = JSON.stringify(updatedData);
  }


  return(
    <>
        <SearchInput step={step} inputvalue={inputvalue} setInputValue={setInputValue} />
        <div className="all-in-container">
          {step === 'home' && inputvalue.trim() === '' && data ? 
            <div className="trending">
              <h2>Trending</h2>
              <div className="trending-container" ref={sliderRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleEnd} onMouseLeave={handleEnd} onTouchStart={handleTouchStart} onTouchEnd={handleEnd}>
                {data?.filter(x => x.isTrending).map((x, index) => ( 
                  <div className="trending-item" key={index}>
                    <div className="hover-image">
                      <div className="hover-image-btn">
                        <img draggable='false' src="/images/shared/play-icon.svg"/>
                        <p>Play</p>
                      </div>
                    </div>
                    <img className="mobile--image thumbnail" draggable='false' src={x.thumbnail.trending.small} />
                    <img className="tablet--image thumbnail" draggable='false' src={x.thumbnail.trending.medium} />
                    <img className="desktop--image thumbnail" draggable='false' src={x.thumbnail.trending.large} />
                    <div className="bookmark" onClick={() => toggleBookmark(x.title)}>{x.isBookmarked ? <i className="fa-solid fa-bookmark"></i> : <i className="fa-regular fa-bookmark"></i>}</div>
                    <div className="trending-item__wrapper">
                      <div className="trending-item-info">
                      <div className="trending-item-info-text">
                        <p>{x.year}</p> 
                        <span className="circle"></span>
                        <p><img src={`/images/shared/${x.category.split(' ')[0].toLowerCase()}-category-icon.svg`} /> {x.category}</p>
                        <span className="circle"></span>
                        <p>{x.rating}</p>
                      </div>
                        <p>{x.title}</p>
                      </div>
                      <span className="rating mobile">{x.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
             : ''}
          <FilteredMovies data={data} step={step} inputvalue={inputvalue} />
        </div>
    </>
  )
}