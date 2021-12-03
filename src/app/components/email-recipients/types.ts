export interface FormValue {
    recipients: string[];
    theme: string;
    content: string;
    email?: string;
}

export enum EmailRecipientsControls {
    RECIPIENTS = 'recipients',
    EMAIL = 'email',
    THEME = 'theme',
    CONTENT = 'content'
}
