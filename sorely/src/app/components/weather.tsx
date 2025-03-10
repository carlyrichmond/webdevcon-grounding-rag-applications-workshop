import Image from 'next/image';

type WeatherProps = { 
  location: string, 
  condition: string, 
  condition_image: string,
  temperature: number,
  feels_like_temperature: number,
  humidity: number
}


  export const Weather = (props: WeatherProps) => {
    const conditionImageURL: string = `https:${props.condition_image}`;
    return (
      <div className="weather__summary__container">
        <h3>{props.location}</h3>
        <div className="weather__temp__condition">
          <p className="temperature__p">{props.temperature}°C</p>
          <Image src={conditionImageURL} width={80} height={80} alt={props.condition}/>
        </div>
        <p className="feels__like__p">Feels like {props.feels_like_temperature}°C</p>
        <p>Humidity {props.humidity}%</p>
      </div>
    );
  };