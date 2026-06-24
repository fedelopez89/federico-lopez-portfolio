import { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { SectionTitle } from '../shared/SectionTitle';
import {
  ContactWrapper,
  ContactPanel,
  PanelHeading,
  PanelTagline,
  ContactInfoList,
  ContactInfoItem,
  ContactInfoIcon,
  ContactInfoText,
  FormPanel,
  FormTitle,
  Form,
  FieldGroup,
  Label,
  Input,
  Textarea,
  FieldError,
  CharCount,
  SubmitButton,
  StatusMessage,
  SuccessState,
  SuccessIconWrapper,
  SuccessText,
} from './Contact.styles';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormErrors {
  from_name?: string;
  from_email?: string;
  message?: string;
}

const EmailIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX = 50;
const MSG_MIN = 40;
const MSG_MAX = 300;

const Contact: FC = () => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [msgLength, setMsgLength] = useState(0);

  const validate = (form: HTMLFormElement): FormErrors => {
    const data = new FormData(form);
    const name = (data.get('from_name') as string).trim();
    const email = (data.get('from_email') as string).trim();
    const message = (data.get('message') as string).trim();
    const errs: FormErrors = {};

    if (!name) errs.from_name = t('contact.validation.nameRequired');
    if (!email) errs.from_email = t('contact.validation.emailRequired');
    else if (!EMAIL_REGEX.test(email)) errs.from_email = t('contact.validation.emailInvalid');
    if (!message) errs.message = t('contact.validation.messageRequired');
    else if (message.length < MSG_MIN) errs.message = t('contact.validation.messageTooShort');
    else if (message.length > MSG_MAX) errs.message = t('contact.validation.messageTooLong');

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const errs = validate(formRef.current);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setStatus('loading');

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const isLoading = status === 'loading';

  return (
    <>
      <SectionTitle
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('contact.title')}
      </SectionTitle>

      <ContactWrapper>
        <ContactPanel
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div>
            <PanelHeading>{t('contact.subtitle')}</PanelHeading>
            <PanelTagline>{t('contact.panelTagline')}</PanelTagline>
          </div>

          <ContactInfoList>
            <ContactInfoItem>
              <ContactInfoIcon><EmailIcon /></ContactInfoIcon>
              <ContactInfoText href="mailto:fede.lopez89@gmail.com">
                fede.lopez89@gmail.com
              </ContactInfoText>
            </ContactInfoItem>
            <ContactInfoItem>
              <ContactInfoIcon><LinkedInIcon /></ContactInfoIcon>
              <ContactInfoText
                href="https://www.linkedin.com/in/federicoglopez/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/federicoglopez
              </ContactInfoText>
            </ContactInfoItem>
            <ContactInfoItem>
              <ContactInfoIcon><GitHubIcon /></ContactInfoIcon>
              <ContactInfoText
                href="https://github.com/fedelopez89"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/fedelopez89
              </ContactInfoText>
            </ContactInfoItem>
          </ContactInfoList>
        </ContactPanel>

        <FormPanel>
          {status === 'success' ? (
            <SuccessState
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <SuccessIconWrapper><CheckIcon /></SuccessIconWrapper>
              <SuccessText>{t('contact.success')}</SuccessText>
            </SuccessState>
          ) : (
            <>
              <FormTitle>{t('contact.formTitle')}</FormTitle>
              <Form
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                noValidate
              >
                <FieldGroup>
                  <Label htmlFor="contact-name">{t('contact.name')}</Label>
                  <Input
                    id="contact-name"
                    type="text"
                    name="from_name"
                    placeholder={t('contact.namePlaceholder')}
                    disabled={isLoading}
                    autoComplete="name"
                    maxLength={NAME_MAX}
                    $hasError={!!errors.from_name}
                    onChange={() => clearError('from_name')}
                  />
                  {errors.from_name && (
                    <FieldError
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.from_name}
                    </FieldError>
                  )}
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="contact-email">{t('contact.email')}</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    name="from_email"
                    placeholder={t('contact.emailPlaceholder')}
                    disabled={isLoading}
                    autoComplete="email"
                    $hasError={!!errors.from_email}
                    onChange={() => clearError('from_email')}
                  />
                  {errors.from_email && (
                    <FieldError
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.from_email}
                    </FieldError>
                  )}
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="contact-message">{t('contact.message')}</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder={t('contact.messagePlaceholder')}
                    disabled={isLoading}
                    $hasError={!!errors.message}
                    maxLength={MSG_MAX}
                    onChange={(e) => {
                      setMsgLength(e.target.value.length);
                      clearError('message');
                    }}
                  />
                  <CharCount
                    $warn={msgLength >= MSG_MAX * 0.85}
                    $over={msgLength > MSG_MAX}
                  >
                    {msgLength} / {MSG_MAX}
                  </CharCount>
                  {errors.message && (
                    <FieldError
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.message}
                    </FieldError>
                  )}
                </FieldGroup>

                {status === 'error' && (
                  <StatusMessage
                    $type="error"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {t('contact.error')}
                  </StatusMessage>
                )}

                <SubmitButton type="submit" disabled={isLoading} $loading={isLoading}>
                  {isLoading ? t('contact.sending') : t('contact.send')}
                </SubmitButton>
              </Form>
            </>
          )}
        </FormPanel>
      </ContactWrapper>
    </>
  );
};

export default Contact;
