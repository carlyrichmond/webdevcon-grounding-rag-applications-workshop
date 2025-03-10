export type WeatherResponse = {
    location: {
        name: string,
        region: string,
        country: string
    },
    current: {
    temp_c: number,
    temp_f: number,
    condition: {
      text: string,
      icon: string
    },
    humidity: number,
    feelslike_c: number
    feelslike_f: number
  },
  message?: string
}