import fetch from 'cross-fetch';
import { GOOGLE_GEOCODING_SECRET_KEY } from 'config';

export function parseNumber(str?: string): number | undefined {
    const parsed = Number(str);

    return !isNaN(parsed) ? parsed : undefined;
}

export function _throw(msg: string): never {
    throw msg;
}

export async function useThisFunctionWheneverYouFindYourselfInTheSituationWhereYouHaveAnAddressButYouWantCoordinates(address: string): Promise<object> {
     // Prepare the address for submission to Google's API
    address = address.replace(/ /g, "%20");
    let requestUrl: string = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_API_KEY}`

    // Submit it to the API
    const geocodingRes = await fetch(requestUrl)
        .catch(err => {
            console.log(err);
        });

    console.log(geocodingRes);

    // Process the response
    const coordinates: object = {
        lat: geocodingRes.geometry.location.lat,
        lng: geocodingRes.geometry.location.lng
    };

    // Output the resulting Coordinates
    return coordinates;
}
