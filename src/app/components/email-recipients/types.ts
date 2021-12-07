export interface EmailSchedule {
  recipients: string[];
  theme: string;
  content: string;
}

export interface FormValue extends EmailSchedule{
    email?: string;
}

export interface EmailScheduleBDValue extends EmailSchedule {
  _id: string;
}

export interface EmailScheduleValue extends EmailSchedule {
  id: string;
}

export enum EmailRecipientsControls {
    RECIPIENTS = 'recipients',
    EMAIL = 'email',
    THEME = 'theme',
    CONTENT = 'content'
}
