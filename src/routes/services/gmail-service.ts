import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { gmail_v1, google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import xlsx from 'xlsx';
import { OAuth2Client } from 'google-auth-library';

export async function fetchExcelFileFromEmailInbox(): Promise<xlsx.WorkBook | undefined> {
    const gmail = google.gmail('v1');

    // TODO: look into refresh tokens.
    const auth = await authenticate({
        keyfilePath: path.join(__dirname, '../../../oauth2.keys.json'),
        scopes: 'https://www.googleapis.com/auth/gmail.readonly',
    });

    google.options({ auth });

    const emailId: string | undefined = await getLatestEmailIdFromSender(gmail);

    if (!emailId) {
        return;
    }

    const attachmentId: string | undefined = await getEmailAttachmentId(gmail, emailId);

    if (!attachmentId) {
        return;
    }

    const attachment: string | undefined = await getAttachment(gmail, emailId, attachmentId);

    if (!attachment) {
        return;
    }

    return convertToXLSXInstance(attachment);
}

// TODO: add sender filtering.
async function getLatestEmailIdFromSender(gmail: gmail_v1.Gmail): Promise<string | undefined> {
    const response = await gmail.users.messages.list({ userId: 'me' });

    const allMessages = response.data.messages ?? [];

    console.log(allMessages);

    return allMessages[0].id ?? undefined;
}

async function getEmailAttachmentId(
    gmail: gmail_v1.Gmail,
    messageId: string,
): Promise<string | undefined> {
    const fullMessage = await gmail.users.messages.get({
        userId: 'me',
        id: messageId,
        format: 'full',
    });

    return fullMessage?.data?.payload?.parts?.[1]?.body?.attachmentId ?? undefined;
}

async function getAttachment(
    gmail: gmail_v1.Gmail,
    messageId: string,
    attachmentId: string,
): Promise<string | undefined> {
    const attachmentResponse = await gmail.users.messages.attachments.get({
        id: attachmentId,
        messageId: messageId,
        userId: 'me',
    });

    return attachmentResponse.data?.data ?? undefined;
}

function convertToXLSXInstance(responseData: string): xlsx.WorkBook {
    return xlsx.read(base64UrlDecode(responseData), { type: 'base64' });
}

function base64UrlDecode(base64UrlData: string): string {
    return base64UrlData.replace(/_/g, '/')
        .replace(/-/g, '+');
}
