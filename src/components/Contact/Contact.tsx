import { useState, type FormEvent } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { PROFILE } from '../../data/profile';
import {
  buildMailtoHref,
  hasValidationErrors,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../../utils/validation';
import { SectionHeader } from '../UI/SectionHeader';

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function Contact() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'ready' | 'error'>('idle');
  const [mailtoLink, setMailtoLink] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const handleCopy = async (text: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((current) => (current === field ? null : current));
      }, 2200);
    } catch {
      setCopiedField(null);
    }
  };

  const handleChange = (field: keyof ContactFormValues, nextValue: string) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
    if (status === 'ready' || status === 'error') {
      setStatus('idle');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    const href = buildMailtoHref(PROFILE.email, values);
    setMailtoLink(href);

    window.setTimeout(() => {
      try {
        const anchor = document.createElement('a');
        anchor.href = href;
        anchor.style.display = 'none';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        setStatus('ready');
      } catch {
        setStatus('ready');
      }
    }, 180);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="08"
          title="Let's create something meaningful."
          subtitle="I am interested in entry-level opportunities, internships, web development roles, and collaborative projects where I can learn, contribute, and grow."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Contact Details Panel */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#141A21] p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <div>
                <p className="font-mono text-xs text-[#C6F36B]">Direct Contact</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[#F5F7FA]">
                  {PROFILE.name}
                </h3>
                <p className="mt-1 text-sm text-[#A0AAB8]">{PROFILE.role}</p>
              </div>

              <div className="space-y-4 border-t border-white/[0.08] pt-6">
                {/* Email */}
                <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-[#10141A] p-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="h-4 w-4 shrink-0 text-[#70D9FF]" aria-hidden="true" />
                    <div className="min-w-0">
                      <span className="block font-mono text-[11px] text-[#A0AAB8]">Email</span>
                      <a
                        href={`mailto:${PROFILE.email}`}
                        className="block truncate text-sm font-medium text-[#F5F7FA] hover:text-[#C6F36B] transition-colors"
                      >
                        {PROFILE.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.email, 'email')}
                    aria-label="Copy email address"
                    className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.1] bg-[#141A21] px-2.5 text-xs font-medium text-[#F5F7FA] hover:border-[#C6F36B]/50 transition-colors"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#C6F36B]" aria-hidden="true" />
                        <span className="text-[#C6F36B]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-[#10141A] p-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <Phone className="h-4 w-4 shrink-0 text-[#70D9FF]" aria-hidden="true" />
                    <div className="min-w-0">
                      <span className="block font-mono text-[11px] text-[#A0AAB8]">Phone</span>
                      <a
                        href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                        className="block truncate text-sm font-medium text-[#F5F7FA] hover:text-[#C6F36B] transition-colors tabular-nums"
                      >
                        {PROFILE.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.phone, 'phone')}
                    aria-label="Copy phone number"
                    className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.1] bg-[#141A21] px-2.5 text-xs font-medium text-[#F5F7FA] hover:border-[#C6F36B]/50 transition-colors"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#C6F36B]" aria-hidden="true" />
                        <span className="text-[#C6F36B]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#10141A] p-3.5">
                  <MapPin className="h-4 w-4 shrink-0 text-[#C6F36B]" aria-hidden="true" />
                  <div>
                    <span className="block font-mono text-[11px] text-[#A0AAB8]">Location</span>
                    <span className="text-sm font-medium text-[#F5F7FA]">
                      {PROFILE.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.08] pt-5">
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-[#10141A] px-4 py-2.5 text-sm font-medium text-[#F5F7FA] hover:border-[#C6F36B]/50 transition-colors"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>GitHub — @{PROFILE.githubUsername}</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#A0AAB8]" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Contact Form (Mailto Composer with Full Client Validation) */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-white/[0.08] bg-[#141A21] p-6 sm:p-8 lg:col-span-7 space-y-5"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-[#F5F7FA]"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={values.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Your full name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className="mt-2 w-full rounded-lg border border-white/[0.12] bg-[#10141A] px-3.5 py-2.5 text-sm text-[#F5F7FA] placeholder:text-[#A0AAB8]/60 focus:border-[#C6F36B] focus:outline-none"
                />
                {errors.name && (
                  <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-red-300">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-[#F5F7FA]"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={values.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className="mt-2 w-full rounded-lg border border-white/[0.12] bg-[#10141A] px-3.5 py-2.5 text-sm text-[#F5F7FA] placeholder:text-[#A0AAB8]/60 focus:border-[#C6F36B] focus:outline-none"
                />
                {errors.email && (
                  <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-red-300">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="block text-sm font-medium text-[#F5F7FA]"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                value={values.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                placeholder="Web Developer Opportunity / Collaboration"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                className="mt-2 w-full rounded-lg border border-white/[0.12] bg-[#10141A] px-3.5 py-2.5 text-sm text-[#F5F7FA] placeholder:text-[#A0AAB8]/60 focus:border-[#C6F36B] focus:outline-none"
              />
              {errors.subject && (
                <p id="contact-subject-error" role="alert" className="mt-1.5 text-xs text-red-300">
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-[#F5F7FA]"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                value={values.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Share role details, project context, or a brief introduction..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className="mt-2 w-full rounded-lg border border-white/[0.12] bg-[#10141A] px-3.5 py-2.5 text-sm text-[#F5F7FA] placeholder:text-[#A0AAB8]/60 focus:border-[#C6F36B] focus:outline-none resize-y"
              />
              {errors.message && (
                <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-red-300">
                  {errors.message}
                </p>
              )}
            </div>

            {status === 'ready' && mailtoLink && (
              <div
                role="status"
                className="rounded-xl border border-[#C6F36B]/30 bg-[#C6F36B]/10 p-4 text-sm text-[#F5F7FA]"
              >
                <p className="font-medium text-[#C6F36B]">
                  Email draft prepared for your mail client.
                </p>
                <p className="mt-1 text-xs text-[#A0AAB8]">
                  Since this portfolio runs as a static web app without a backend mail server, your message opens directly in your email application.
                </p>
                <a
                  href={mailtoLink}
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#70D9FF] underline hover:text-[#C6F36B]"
                >
                  <span>Open Email Draft Directly</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            )}

            {status === 'error' && (
              <p role="alert" className="text-xs text-red-300">
                Please correct the highlighted fields before composing your email.
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <p className="font-mono text-xs text-[#A0AAB8]">
                Opens directly in your email app via mailto.
              </p>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#C6F36B] px-5 py-2.5 text-sm font-semibold text-[#080A0E] hover:bg-[#d4f78c] disabled:opacity-60 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B]"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                <span>{status === 'submitting' ? 'Preparing Email...' : 'Send Message'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
