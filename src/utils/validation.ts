export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedSubject = values.subject.trim();
  const trimmedMessage = values.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!trimmedSubject) {
    errors.subject = 'Please enter a subject.';
  } else if (trimmedSubject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please write a message.';
  } else if (trimmedMessage.length < 15) {
    errors.message = 'Message must be at least 15 characters long.';
  }

  return errors;
}

export function hasValidationErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function buildMailtoHref(recipientEmail: string, values: ContactFormValues): string {
  const subject = encodeURIComponent(values.subject.trim());
  const body = encodeURIComponent(
    `From: ${values.name.trim()} (${values.email.trim()})\n\n${values.message.trim()}`
  );
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}
