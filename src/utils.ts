import fetch from 'cross-fetch';
import { GOOGLE_GEOCODING_SECRET_KEY } from './config';

export function parseNumber(str?: string): number | undefined {
    const parsed = Number(str);

    return !isNaN(parsed) ? parsed : undefined;
}

export function _throw(msg: string): never {
    throw msg;
}

// TODO: Query the database for address first, then hit the database.
// TODO: Move this to a dedicated services file

export async function getCoordsFromAddress(address: string): Promise<any> {
    const urlAddress = address.replace(/ /g, "%20");
    const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_GEOCODING_SECRET_KEY}`
    const coords = {
        lat: '0',
        lng: '0',
    }
    try {
        const geocodingRes = await fetch(requestUrl)
            .then((res) => res.json());
        const coordRes = geocodingRes.results[0].geometry.location
        coords.lat = coordRes.lat;
        coords.lng = coordRes.lng;
    } catch (error) {
        console.log(error);
    }
    return coords;
}
