// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { google } = require('googleapis');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { authenticate } = require('@google-cloud/local-auth');
const gmail = google.gmail('v1');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const base64 = require('base-64');
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as fs from "fs";

import xlsx from 'xlsx';

export async function runSample() {
    // Obtain user credentials to use for the request
    const auth = await authenticate({
        keyfilePath: path.join(__dirname, '../../../oauth2.keys.json'),
        scopes: 'https://www.googleapis.com/auth/gmail.readonly',
    });
    google.options({ auth });

    const response = await gmail.users.messages.list({ userId: 'me' });
    const allMessages = response.data.messages;
    const firstMessageID = allMessages[0].id;
    const fullMessage = await gmail.users.messages.get({
        userId: 'me',
        id: firstMessageID,
        format: 'full',
    });
    const attachment = fullMessage.data.payload.parts[1].body;

    gmail.users.messages.attachments
        .get({
            id: attachment.attachmentId,
            messageId: firstMessageID,
            userId: 'me',
        })
        .then(
            (response: any) => {
                const base64Data = base64UrlDecode(response.data.data)

                const decodedData = base64.decode(base64Data);

                const workbook = xlsx.read(decodedData, { type: 'string' });

                const binary = xlsx.write(workbook, { type: 'binary' });
                fs.writeFile('./src/routes/services/workbookOne.xlsx', binary, (err: any) => console.log(err));

                const bruh = Buffer.from(response.data.data, 'base64url')
                fs.writeFile('./src/routes/services/workbookTwo.xlsx', bruh, (err: any) => console.log(err));
            },
            function (err: any) {
                console.error('Execute error', err);
            },
        );


}

function base64UrlDecode(base64UrlData: string): string {
    return base64UrlData.replace(/_/g, '/').replace(/-/g, '+');
}
