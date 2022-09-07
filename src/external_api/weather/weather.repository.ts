import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

/**
 * @code writer 김현균
 * @description www.weatherapi.com api 요청 Repository
 */
@Injectable()
export class WeatherRepository {
  constructor(private readonly httpService: HttpService) {}

  /**
   * @code writer 김현균
   * @description 위치값을 이용한 날씨정보 반환함수
   *
   * @param coordinate 위도,경도 ex)37.5666805,126.9784147
   *
   * @returns string 날씨 정보
   */
  async getWeather(coordinate = '37.5666805,126.9784147'): Promise<string> {
    const resData = await this.httpService
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${coordinate}&lang=ko`,
      )
      .toPromise();

    const { condition } = resData.data.current;

    return condition.text;
  }
}
