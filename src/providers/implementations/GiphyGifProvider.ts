import axios, { AxiosInstance } from 'axios';
import AppError from '../../errors/AppError';
import { IGif, IGifProvider } from '../IGifProvider';

interface GiphyGif {
  id: string;
}

interface GiphyResponse {
  data: GiphyGif[];
}

class GiphyGifProvider implements IGifProvider {
  private api: AxiosInstance;

  // public api key
  private apiKey = 'dc6zaTOxFJmzC';

  constructor() {
    if (process.env.GIPHY_API_KEY) this.apiKey = process.env.GIPHY_API_KEY;

    this.api = axios.create({
      baseURL: 'https://api.giphy.com/v1/gifs',
      params: { api_key: this.apiKey },
    });
  }

  async findOne(term: string): Promise<IGif> {
    try {
      const { data } = await this.api.get<GiphyResponse>('/search', {
        params: { q: term, limit: 1, rating: 'g' },
      });

      const [gif] = data.data;

      return {
        url: gif.id
          ? `https://media.giphy.com/media/${gif.id}/giphy.gif`
          : null,
      };
    } catch (err) {
      if (err.response.status === 429)
        console.log('GIPHY API rate limit exceeded');
      else console.log(err.message);

      throw new AppError('GIPHY API is unavailable', 503);
    }
  }
}

export default GiphyGifProvider;
