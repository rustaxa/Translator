import he from 'he';
import axios from 'axios';
import { find } from 'lodash';
import striptags from 'striptags';

export async function getSubtitles({
  videoID,
  lang = 'en',
}: {
  videoID: string,
  lang: 'en' | 'de' | 'fr' | void,
}) {
  const { data } = await axios.get(
    //`https://youtube.com/get_video_info?video_id=${videoID}`
    `http://192.168.1.66/caps.php?id=${videoID}`
  );

  const decodedData = decodeURIComponent(data);

  // * ensure we have access to captions data
  try{
    if (!decodedData.includes('captionTracks')) //return [{text: 'No caps', start: '1'}]
      throw new Error(`Could not find captions for video: ${videoID}`);
  }catch(err){
    return [{text: 'No caps', start: '1'}]
  }

  const regex = /({"captionTracks":.*isTranslatable":(true|false)}])/;
  const [match] = regex.exec(decodedData);
  const { captionTracks } = JSON.parse(`${match}}`);

  const subtitle =
    find(captionTracks, {
      vssId: `.${lang}`,
    }) ||
    find(captionTracks, {
      vssId: `a.${lang}`,
    }) ||
    find(captionTracks, ({ vssId }) => vssId && vssId.match(`.${lang}`));

  // * ensure we have found the correct subtitle lang
  if (!subtitle || (subtitle && !subtitle.baseUrl))
    throw new Error(`Could not find ${lang} captions for ${videoID}`);

  const { data: transcript } = await axios.get(subtitle.baseUrl);
  const lines = transcript
    .replace('<?xml version="1.0" encoding="utf-8" ?><transcript>', '')
    .replace('</transcript>', '')
    .split('</text>')
    .filter(line => line && line.trim())
    .map(line => {
      const startRegex = /start="([\d.]+)"/;
      const durRegex = /dur="([\d.]+)"/;

      const [, start] = startRegex.exec(line);
      const [, dur] = durRegex.exec(line);

      const htmlText = line
        .replace(/<text.+>/, '')
        .replace(/&amp;/gi, '&')
        .replace(/<\/?[^>]+(>|$)/g, '');

      const decodedText = he.decode(htmlText);
      const text = striptags(decodedText);

      return {
        start,
        dur,
        text,
      };
    });

  return lines;
}


export default getSubtitles;