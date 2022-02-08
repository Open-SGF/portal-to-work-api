import { Service } from 'typedi';
import fetch from 'cross-fetch';
import { GOOGLE_RECAPTCHA_SECRET_KEY } from '../config';

const recaptchaVerifyUrl = 'https://www.google.com/recaptcha/api/siteverify';

export interface IRecaptchaResponse {
    success: boolean;
    challenge_ts?: string;
    hostname?: string;
    error_codes?: string[];
}

@Service()
export class RecaptchaService {
    async verify(token: string): Promise<IRecaptchaResponse> {
        const res = await fetch(recaptchaVerifyUrl, {
            method: 'POST',
            body: new URLSearchParams({
                secret: GOOGLE_RECAPTCHA_SECRET_KEY,
                response: token,
            }),
        });

        return (await res.json()) as IRecaptchaResponse;
    }
}
