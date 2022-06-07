import path from 'path';
import { gmail_v1, google, GoogleApis } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import xlsx from 'xlsx';
// import { OAuth2Client } from 'google-auth-library';
import { GaxiosPromise } from 'googleapis/build/src/apis/accesscontextmanager';

export async function fetchExcelFileFromEmailInbox(): Promise<any> {
    const gmail = await initializeGmailInstance(google);

    const senderEmail = process.env.JOBS_DATA_SENDER_EMAIL_ADDRESS;

    if (!senderEmail) {
        return;
    }

    const latestEmail = await fetchLatestEmailBySender(gmail, senderEmail);

    if (!latestEmail) {
        return;
    }

    const attachment = await fetchAttachmentFromEmail(gmail, latestEmail);

    if (!attachment) {
        return;
    }

    return convertToXLSXInstance(attachment);
}

async function initializeGmailInstance(google: GoogleApis): Promise<gmail_v1.Gmail> {
    // TODO: look into refresh tokens.
    const auth = await authenticate({
        keyfilePath: path.join(__dirname, '../../../oauth2.keys.json'),
        scopes: 'https://www.googleapis.com/auth/gmail.readonly',
    });

    google.options({ auth });

    return google.gmail('v1');
}

async function fetchLatestEmailBySender(gmail: gmail_v1.Gmail, senderEmail: string) {
    const emailIds = await fetchAllEmailIds(gmail);

    if (!emailIds) {
        return;
    }

    const emails = await fetchAllEmails(gmail, emailIds);

    const sendersEmails = emails.filter((email: any) => {
        return email?.data?.payload?.headers.some((header: any) => {
            return header.name === 'From' && header.value.includes(senderEmail);
        });
    });

    return sendersEmails[0];
}

async function fetchAllEmailIds(gmail: gmail_v1.Gmail): Promise<Array<string> | undefined> {
    const response = await gmail.users.messages.list({ userId: 'me' });

    const messages = response.data.messages ?? [];

    return messages
        .filter(Boolean)
        .map((res) => res.id)
        .map(String);
}

async function fetchAllEmails(gmail: gmail_v1.Gmail, emailIds: Array<string>): Promise<any> {
    return await Promise.all(emailIds.map((id) => fetchEmail(gmail, id)));
}

async function fetchEmail(
    gmail: gmail_v1.Gmail,
    messageId: string,
): Promise<GaxiosPromise<gmail_v1.Schema$Message>> {
    return await gmail.users.messages.get({
        userId: 'me',
        id: messageId,
        format: 'full',
    });
}

async function fetchAttachmentFromEmail(
    gmail: gmail_v1.Gmail,
    email: any,
): Promise<string | undefined> {
    const attachmentId = email?.data?.payload?.parts?.[1]?.body?.attachmentId ?? undefined;

    if (!attachmentId) {
        return;
    }

    const attachmentResponse = await gmail.users.messages.attachments.get({
        id: attachmentId,
        messageId: email.data.id,
        userId: 'me',
    });

    return attachmentResponse.data?.data ?? undefined;
}

function convertToXLSXInstance(responseData: string): xlsx.WorkBook {
    return xlsx.read(base64UrlDecode(responseData), { type: 'base64' });
}

function base64UrlDecode(base64UrlData: string): string {
    return base64UrlData.replace(/_/g, '/').replace(/-/g, '+');
}
