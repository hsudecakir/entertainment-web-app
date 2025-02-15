import { useContext, useState } from "react";
import { DataContext } from "../App";

export default function FilteredMovies({ step, inputvalue }){

  const { data, setData } = useContext(DataContext);

  if (!Array.isArray(data)) {
    return <p>Loading...</p>;
  }

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
  
  const homePageHeader = 'Recommended for you';
  const moviesPageHeader = 'Movies';
  const tvPageHeader = 'TV Series';
  const bookmarksMoviePageHeader = 'Bookmarked Movies';
  const bookmarksTvPageHeader = 'Bookmarked TV Series';
  const searchingHeader = `Found ${data?.filter(x => step === 'home' ? x : step === 'movie' ? x.category === 'Movie' : step === 'tv' ? x.category === 'TV Series' : step === 'bookmark' && x.isBookmarked).filter(x => x.title.toLowerCase().includes(inputvalue.toLowerCase())).length} results for ‘${inputvalue}’`;

  return(
    <div className="movies-container">
      <h2>{inputvalue.trim() !== '' ? searchingHeader : step === 'home' ? homePageHeader : step === 'movie' ? moviesPageHeader : step === 'tv' ? tvPageHeader : step === 'bookmark' && data?.filter(x => !x.isTrending ).filter(x => x.category === 'Movie' && x.isBookmarked).length > 0 && bookmarksMoviePageHeader}</h2>
      <div className="movies-thumbnails-container">
        {data?.filter(x => step === 'home' ? !x.isTrending : step === 'movie' ? x.category === 'Movie' : step === 'tv' ? x.category === 'TV Series' : step === 'bookmark' && x.category === 'Movie' && x.isBookmarked).filter(x => x.title.toLowerCase().includes(inputvalue.toLowerCase())).map((x, index) => (
          <div className="movies-thumbnail-item" key={index}>
            <div className="movies-thumbnail-item-image-container">
              <div className="hover-image">
                <div className="hover-image-btn">
                  <img src="/images/shared/play-icon.svg"/>
                  <p>Play</p>
                </div>
              </div>
              <img className="mobile--image thumbnail" src={x.thumbnail.regular.small} />
              <img className="tablet--image thumbnail" src={x.thumbnail.regular.medium} />
              <img className="desktop--image thumbnail" src={x.thumbnail.regular.large} />
              <div className="bookmark" onClick={() => toggleBookmark(x.title)}>
                {x.isBookmarked ? <i className="fa-solid fa-bookmark"></i> : <i className="fa-regular fa-bookmark"></i>}
              </div>
            </div>
            <div className="movies-item-info">
              <div className="movies-item-info-text">
                <p>{x.year}</p> 
                <span className="circle"></span>
                <p><img src={`/images/shared/${x.category.split(' ')[0].toLowerCase()}-category-icon.svg`} /> {x.category}</p>
                <span className="circle"></span>
                <p>{x.rating}</p>
              </div>
              <p>{x.title}</p>
            </div>
          </div>
        ))}
        {inputvalue.trim() !== '' && data?.filter(x => !x.isTrending ).filter(x => step === 'bookmark' && x.category === 'TV Series' && x.isBookmarked).filter(x => x.title.toLowerCase().includes(inputvalue.toLowerCase())).map((x, index) => (
          <div className="movies-thumbnail-item" key={index}>
            <div className="movies-thumbnail-item-image-container">
              <div className="hover-image">
                <div className="hover-image-btn">
                  <img src="/images/shared/play-icon.svg"/>
                  <p>Play</p>
                </div>
              </div>
              <img className="mobile--image thumbnail" src={x.thumbnail.regular.small} />
              <img className="tablet--image thumbnail" src={x.thumbnail.regular.medium} />
              <img className="desktop--image thumbnail" src={x.thumbnail.regular.large} />
              <div className="bookmark" onClick={() => toggleBookmark(x.title)}>
                {x.isBookmarked ? <i className="fa-solid fa-bookmark"></i> : <i className="fa-regular fa-bookmark"></i>}
              </div>
            </div>
            <div className="movies-item-info">
              <div className="movies-item-info-text">
                <p>{x.year}</p> 
                <span className="circle"></span>
                <p><img src={`/images/shared/${x.category.split(' ')[0].toLowerCase()}-category-icon.svg`} /> {x.category}</p>
                <span className="circle"></span>
                <p>{x.rating}</p>
              </div>
              <p>{x.title}</p>
            </div>
          </div>
        ))}
      </div>
      {step === 'bookmark' && inputvalue.trim() === '' && data?.filter(x => x.category === 'TV Series' && x.isBookmarked).length > 0 ? 
      <>
        <h2 className="bookmark-header">{bookmarksTvPageHeader}</h2>
        <div className="movies-thumbnails-container">
        {data?.filter(x => x.category === 'TV Series' && x.isBookmarked).map((x, index) => (
          <div className="movies-thumbnail-item" key={index}>
            <div className="movies-thumbnail-item-image-container">
            <div className="hover-image">
                <div className="hover-image-btn">
                  <img src="/images/shared/play-icon.svg"/>
                  <p>Play</p>
                </div>
              </div>
              <img className="mobile--image thumbnail" src={x.thumbnail.regular.small} />
              <img className="tablet--image thumbnail" src={x.thumbnail.regular.medium} />
              <img className="desktop--image thumbnail" src={x.thumbnail.regular.large} />
              <div className="bookmark" onClick={() => toggleBookmark(x.title)}>
                {x.isBookmarked ? <i className="fa-solid fa-bookmark"></i> : <i className="fa-regular fa-bookmark"></i>}
              </div>
            </div>
            <div className="movies-item-info">
              <div className="movies-item-info-text">
                <p>{x.year}</p> 
                <span className="circle"></span>
                <p><img src={`/images/shared/${x.category.split(' ')[0].toLowerCase()}-category-icon.svg`} /> {x.category}</p>
                <span className="circle"></span>
                <p>{x.rating}</p>
              </div>
              <p>{x.title}</p>
            </div>
          </div>
        ))}
      </div>
      </> : ''}
    </div>
  )
}