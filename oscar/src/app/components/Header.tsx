export default function Header() {
    return (
      <header className="banner">
        <div className="banner__contents">
          <h1 className="banner__title">Wicked</h1>
          <div className="banner__buttons">
            <button className="banner__button">Play</button>
            <button className="banner__button">My List</button>
          </div>
          <p className="banner__description">Elphaba, a young woman misunderstood because of her green skin, and Glinda, a popular aristocrat gilded by privilege, become unlikely friends in the fantastical Land of Oz.</p>
        </div>
        <div className="banner--fadeBottom"></div>
      </header>
    );
  }
