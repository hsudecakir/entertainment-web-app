import { useContext } from "react";
import { StepContext } from "../App";

export default function Header(){
  const { step, setStep } = useContext(StepContext);

  const homeIcon = '/images/shared/home-icon.svg';
  const movieIcon = '/images/shared/movie-icon.svg';
  const tvIcon = '/images/shared/tv-icon.svg';
  const bookmarkIcon = '/images/shared/bookmark-icon.svg';
  const homeIconActive = '/images/shared/home-icon--active.svg';
  const movieIconActive = '/images/shared/movie-icon--active.svg';
  const tvIconActive = '/images/shared/tv-icon--active.svg';
  const bookmarkIconActive = '/images/shared/bookmark-icon--active.svg';


  return(
    <header className="header">
      <img className="logo mobile" src="/images/shared/logo.svg" alt="Logo" />
      <div className="step-icons mobile">
        <a href="#/"><img onClick={() => setStep('home')} src={step === 'home' ? homeIconActive : homeIcon} alt="Home Icon" /></a>
        <a href="#/movies"><img onClick={() => setStep('movie')} src={step === 'movie' ? movieIconActive : movieIcon} alt="Movie Icon" /></a>
        <a href="#/tv-series"><img onClick={() => setStep('tv')} src={step === 'tv' ? tvIconActive : tvIcon} alt="Tv Icon" /></a>
        <a href="#/bookmarks"><img onClick={() => setStep('bookmark')} src={step === 'bookmark' ? bookmarkIconActive : bookmarkIcon} alt="Bookmark Icon" /></a>
      </div>
      <div className="header__wrapper">
        <a href="#/"><img onClick={() => setStep('home')} className="logo" src="/images/shared/logo.svg" alt="Logo" /></a>
        <div className="step-icons">
          <a href="#/"><img onClick={() => setStep('home')} src={step === 'home' ? homeIconActive : homeIcon} alt="Home Icon" /></a>
          <a href="#/movies"><img onClick={() => setStep('movie')} src={step === 'movie' ? movieIconActive : movieIcon} alt="Movie Icon" /></a>
          <a href="#/tv-series"><img onClick={() => setStep('tv')} src={step === 'tv' ? tvIconActive : tvIcon} alt="Tv Icon" /></a>
          <a href="#/bookmarks"><img onClick={() => setStep('bookmark')} src={step === 'bookmark' ? bookmarkIconActive : bookmarkIcon} alt="Bookmark Icon" /></a>
        </div>
      </div>
      <img className="profile-picture" src="/images/shared/profile-picture.svg" alt="Profile Picture" />
    </header>
  )
}