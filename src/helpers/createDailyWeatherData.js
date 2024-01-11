import convertDate from './convertDate';

export default function createDailyWeatherData(data, city) {
  const weatherDaily = data.map((day) => {
    return {
      city: city,
      description: day.condition.description,
      temp: Math.round(day.temperature.day),
      max: Math.round(day.temperature.maximum),
      min: Math.round(day.temperature.minimum),
      humidity: Math.round(day.temperature.humidity),
      wind: Math.round(day.wind.speed),
      icon: day.condition.icon_url,
      iconAlt: day.condition.icon,
      date: convertDate(day.time),
    };
  });
  return weatherDaily;
}
