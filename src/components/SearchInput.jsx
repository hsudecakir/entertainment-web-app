export default function SearchInput({ step, inputvalue, setInputValue }){

  return(
    <div className="search-input-container">
      <img src="/images/shared/search-icon.svg" alt="Search Icon" />
      <input onChange={(e) => setInputValue(e.target.value)} value={inputvalue} type="text" placeholder={step === 'home' ? 'Search for movies or TV series' : step === 'movie' ? 'Search for movies' : step === 'tv' ? 'Search for TV series' : step === 'bookmark' && 'Search for bookmarked shows'}/>
    </div>
  )
}