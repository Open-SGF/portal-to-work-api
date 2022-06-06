import {GOOGLE_MAPS_API_KEY} from "../config";
import fetch from "cross-fetch";
import {Connection} from "typeorm";
import {Location} from "../entities/Location";
import {getManager} from "typeorm";

export default class GeocodingService {
    private orm: Connection;

    constructor (orm: Connection) {
        this.orm = orm;
    }

    public async getCoordsFromAddress (address: string) {
        // Check the database for any coords associated with this address.
        const location = await getManager()
            .createQueryBuilder(Location, "locations")
            .where("locations.address = :address", {
                address: '1840 S Weller Ave, Springfield, MO 65804'
            })
            .getOne();

        // Otherwise, ask Google for the coords of this address.
        if (!coords) {
            const urlAddress = encodeURIComponent(address.trim());
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
                // TODO: save results to database
            } catch (error) {
                console.log(error);
            }
        }

        return true;
    }
}
