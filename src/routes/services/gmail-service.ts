// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { google } = require('googleapis');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { authenticate } = require('@google-cloud/local-auth');
const gmail = google.gmail('v1');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

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
                const data = response.data.data
                const base64Data = data.replace(/^data:image \/jpg;base64,/, '');
                const dataTwo = new Buffer(base64Data, 'base64');
                try {
                    fs.writeFile('./src/routes/services/test.jpg', dataTwo, (err: any) => console.log(err));
                } catch (err) {
                    console.error(err);
                }
            },
            function (err: any) {
                console.error('Execute error', err);
            },
        );


}
