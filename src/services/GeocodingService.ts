import {GOOGLE_MAPS_API_KEY} from "../config";
import fetch from "cross-fetch";

export default class GeocodingService {
    public async getCoordsFromAddress(address: string): Promise<any> {
        // Check the database for any coords associated with this address.
        let coords = await LocationModel.search(address);
        // Otherwise, ask Google for the coords of this address.
        if (!coords) {
            const urlAddress = address.replace(/ /g, "%20");
            const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_MAPS_API_KEY}`
            coords = {
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
        }

        return coords;
    }
}
