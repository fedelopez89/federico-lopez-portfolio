import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Eyebrow, TextLink, VisuallyHidden, Button } from '../../ui';
import {
  fadeUpVariants,
  fadeVariants,
  inViewProps,
} from '../../../styles/motion';
import { SectionHeader } from '../shared/SectionHeader';
import { sectionTitleId } from '../shared/sectionTitleId';
import {
  Layout,
  Intro,
  IntroHeading,
  IntroTagline,
  ContactList,
  ContactRow,
  RowLabel,
  RowValue,
  EmailLink,
  CopyButton,
  FormColumn,
  FormPanel,
  FormTitle,
  Form,
  Honeypot,
  FieldGroup,
  Label,
  Input,
  Textarea,
  FieldMeta,
  CharCount,
  FieldError,
  StatusMessage,
  ErrorSummary,
  SummaryTitle,
  SummaryList,
  SummaryLink,
  Spinner,
  SubmitButton,
  SuccessPanel,
  SuccessIcon,
  SuccessTitle,
  SuccessText,
} from './Contact.styles';

type Status = 'idle' | 'loading' | 'success' | 'error';
type FieldName = 'from_name' | 'from_email' | 'message';
type FormErrors = Partial<Record<FieldName, string>>;

const EMAIL = 'fede.lopez89@gmail.com';
const LINKEDIN_HREF = 'https://www.linkedin.com/in/federicoglopez/';
const GITHUB_HREF = 'https://github.com/fedelopez89';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX = 50;
const MSG_MIN = 40;
const MSG_MAX = 300;
const MSG_WARN_REMAINING = 20;
const COPIED_RESET_MS = 2000;
const COPY_FAILED_RESET_MS = 5000;
const COPY_REANNOUNCE_MS = 50;

const FIELD_LABEL_KEYS: Record<FieldName, string> = {
  from_name: 'contact.name',
  from_email: 'contact.email',
  message: 'contact.message',
};

const FIELD_ORDER: FieldName[] = ['from_name', 'from_email', 'message'];
const FIELD_IDS: Record<FieldName, string> = {
  from_name: 'contact-name',
  from_email: 'contact-email',
  message: 'contact-message',
};

const describedBy = (...ids: Array<string | false | undefined>) =>
  ids.filter(Boolean).join(' ') || undefined;

const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

const CopyIcon = () => (
  <svg {...iconProps}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
);

const AlertIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5M12 16h.01" />
  </svg>
);

const CheckIcon = () => (
  <svg {...iconProps}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

const Contact: FC = () => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const emailLinkRef = useRef<HTMLAnchorElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const prefetchedRef = useRef(false);
  const sendingRef = useRef(false);
  const focusNameOnIdleRef = useRef(false);
  const copyTimerRef = useRef<number>(undefined);
  const msgLengthRef = useRef(0);
  const msgTrimmedRef = useRef(0);

  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  // True after an invalid submit: fields then re-validate on blur and the
  // summary is shown.
  const [attempted, setAttempted] = useState(false);
  // Bumped on each invalid submit so the summary takes focus after commit.
  const [summaryFocusTick, setSummaryFocusTick] = useState(0);
  const [msgLength, setMsgLength] = useState(0);
  const [charNote, setCharNote] = useState('');
  const [copyNote, setCopyNote] = useState('');
  const [copyFailed, setCopyFailed] = useState(false);

  const isLoading = status === 'loading';
  const invalidFields = FIELD_ORDER.filter((field) => errors[field]);
  const showSummary = attempted && invalidFields.length > 0;

  useEffect(() => {
    if (status === 'success') successHeadingRef.current?.focus();
    if (status === 'idle' && focusNameOnIdleRef.current) {
      focusNameOnIdleRef.current = false;
      document.getElementById(FIELD_IDS.from_name)?.focus();
    }
  }, [status]);

  // Runs after the commit, so fields already carry aria-invalid/describedby.
  useEffect(() => {
    if (summaryFocusTick > 0) summaryRef.current?.focus();
  }, [summaryFocusTick]);

  useEffect(() => {
    if (!copyNote) return;
    const timer = window.setTimeout(
      () => setCopyNote(''),
      copyFailed ? COPY_FAILED_RESET_MS : COPIED_RESET_MS
    );
    return () => clearTimeout(timer);
  }, [copyNote, copyFailed]);

  useEffect(() => () => clearTimeout(copyTimerRef.current), []);

  const validateField = (field: FieldName, raw: string): string | undefined => {
    const value = raw.trim();
    switch (field) {
      case 'from_name':
        return value ? undefined : t('contact.validation.nameRequired');
      case 'from_email':
        if (!value) return t('contact.validation.emailRequired');
        return EMAIL_REGEX.test(value)
          ? undefined
          : t('contact.validation.emailInvalid');
      case 'message':
        if (!value) return t('contact.validation.messageRequired');
        // Longer values cannot be typed or pasted: the textarea has maxLength.
        return value.length < MSG_MIN
          ? t('contact.validation.messageTooShort')
          : undefined;
    }
  };

  const validate = (form: HTMLFormElement): FormErrors => {
    const data = new FormData(form);
    const errs: FormErrors = {};
    for (const field of FIELD_ORDER) {
      const error = validateField(field, String(data.get(field) ?? ''));
      if (error) errs[field] = error;
    }
    return errs;
  };

  const focusField = (field: FieldName) =>
    document.getElementById(FIELD_IDS[field])?.focus();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form || sendingRef.current) return;

    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setAttempted(true);
      setSummaryFocusTick((tick) => tick + 1);
      // Drop a stale send-error banner so it doesn't stack with the summary.
      setStatus('idle');
      return;
    }

    setErrors({});
    setAttempted(false);

    if (new FormData(form).get('_honeypot')) {
      setStatus('success');
      return;
    }

    sendingRef.current = true;
    setStatus('loading');

    try {
      // Loaded on demand to keep the SDK out of the main bundle.
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      sendingRef.current = false;
    }
  };

  // Warm the emailjs chunk once, on first interaction with the form.
  const prefetchEmailjs = () => {
    if (prefetchedRef.current) return;
    prefetchedRef.current = true;
    import('@emailjs/browser').catch(() => {
      prefetchedRef.current = false;
    });
  };

  const setFieldError = (field: FieldName, error: string | undefined) =>
    setErrors((prev) =>
      prev[field] === error ? prev : { ...prev, [field]: error }
    );

  // An existing error stays until the field passes; new ones only surface
  // on blur or submit.
  const handleFieldChange = (field: FieldName, value: string) => {
    if (errors[field]) setFieldError(field, validateField(field, value));
  };

  const handleFieldBlur = (field: FieldName, value: string) => {
    if (attempted) setFieldError(field, validateField(field, value));
  };

  const handleMessageChange = (value: string) => {
    const prev = msgLengthRef.current;
    const prevTrimmed = msgTrimmedRef.current;
    const next = value.length;
    const nextTrimmed = value.trim().length;
    const remaining = MSG_MAX - next;
    msgLengthRef.current = next;
    msgTrimmedRef.current = nextTrimmed;
    setMsgLength(next);
    handleFieldChange('message', value);

    // One polite announcement per threshold crossing, never per keystroke.
    if (next >= MSG_MAX && prev < MSG_MAX) {
      setCharNote(t('contact.charNote.limit'));
    } else if (
      remaining <= MSG_WARN_REMAINING &&
      MSG_MAX - prev > MSG_WARN_REMAINING
    ) {
      setCharNote(t('contact.charNote.remaining', { count: remaining }));
    } else if (nextTrimmed >= MSG_MIN && prevTrimmed < MSG_MIN) {
      setCharNote(t('contact.charNote.minReached'));
    }
  };

  // Clear first so repeated copies are announced again.
  const announceCopy = (text: string, failed: boolean) => {
    clearTimeout(copyTimerRef.current);
    setCopyNote('');
    setCopyFailed(failed);
    copyTimerRef.current = window.setTimeout(
      () => setCopyNote(text),
      COPY_REANNOUNCE_MS
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      announceCopy(t('contact.copied'), false);
    } catch {
      const link = emailLinkRef.current;
      const selection = window.getSelection();
      if (link && selection) {
        const range = document.createRange();
        range.selectNodeContents(link);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      announceCopy(t('contact.copyFailed'), true);
    }
  };

  const sendAnother = () => {
    msgLengthRef.current = 0;
    msgTrimmedRef.current = 0;
    setMsgLength(0);
    setCharNote('');
    setErrors({});
    setAttempted(false);
    focusNameOnIdleRef.current = true;
    setStatus('idle');
  };

  const newTab = t('header.newTab');
  const copied = !!copyNote && !copyFailed;

  const renderError = (field: FieldName) =>
    errors[field] && (
      <FieldError
        id={`${FIELD_IDS[field]}-error`}
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
      >
        <AlertIcon />
        <span>{errors[field]}</span>
      </FieldError>
    );

  return (
    <Container>
      <SectionHeader
        index="04"
        title={t('contact.title')}
        titleId={sectionTitleId('contact')}
      />

      <Layout>
        <Intro variants={fadeUpVariants} {...inViewProps}>
          <Eyebrow>{t('contact.eyebrow')}</Eyebrow>
          <IntroHeading>{t('contact.subtitle')}</IntroHeading>
          <IntroTagline>{t('contact.panelTagline')}</IntroTagline>

          <ContactList>
            <ContactRow>
              <RowLabel>{t('contact.email')}</RowLabel>
              <RowValue>
                <EmailLink ref={emailLinkRef} href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </EmailLink>
                <CopyButton
                  variant="ghost"
                  size="sm"
                  aria-label={t('contact.copyEmail')}
                  icon={copied ? <CheckIcon /> : <CopyIcon />}
                  onClick={handleCopy}
                />
                <VisuallyHidden role="status">{copyNote}</VisuallyHidden>
              </RowValue>
            </ContactRow>
            <ContactRow>
              <RowLabel>LinkedIn</RowLabel>
              <RowValue>
                <TextLink
                  href={LINKEDIN_HREF}
                  external
                  externalLabel={newTab}
                  arrow
                >
                  linkedin.com/in/federicoglopez
                </TextLink>
              </RowValue>
            </ContactRow>
            <ContactRow>
              <RowLabel>GitHub</RowLabel>
              <RowValue>
                <TextLink
                  href={GITHUB_HREF}
                  external
                  externalLabel={newTab}
                  arrow
                >
                  github.com/fedelopez89
                </TextLink>
              </RowValue>
            </ContactRow>
          </ContactList>
        </Intro>

        <FormColumn variants={fadeUpVariants} {...inViewProps}>
          <FormPanel>
            {status === 'success' ? (
              <SuccessPanel
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
              >
                <SuccessIcon>
                  <CheckIcon />
                </SuccessIcon>
                <SuccessTitle ref={successHeadingRef} tabIndex={-1}>
                  {t('contact.successTitle')}
                </SuccessTitle>
                <SuccessText>{t('contact.successText')}</SuccessText>
                <Button variant="secondary" onClick={sendAnother}>
                  {t('contact.sendAnother')}
                </Button>
              </SuccessPanel>
            ) : (
              <>
                <FormTitle>{t('contact.formTitle')}</FormTitle>
                <Form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  onFocus={prefetchEmailjs}
                  aria-busy={isLoading}
                  noValidate
                >
                  <Honeypot
                    type="text"
                    name="_honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {showSummary && (
                    <ErrorSummary
                      ref={summaryRef}
                      role="group"
                      aria-labelledby="contact-error-summary-title"
                      tabIndex={-1}
                      variants={fadeVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <SummaryTitle id="contact-error-summary-title">
                        <AlertIcon />
                        <span>
                          {t('contact.errorSummary', {
                            count: invalidFields.length,
                          })}
                        </span>
                      </SummaryTitle>
                      <SummaryList>
                        {invalidFields.map((field) => (
                          <li key={field}>
                            <SummaryLink
                              href={`#${FIELD_IDS[field]}`}
                              onClick={(e) => {
                                e.preventDefault();
                                focusField(field);
                              }}
                            >
                              {t(FIELD_LABEL_KEYS[field])}
                            </SummaryLink>
                          </li>
                        ))}
                      </SummaryList>
                    </ErrorSummary>
                  )}

                  <FieldGroup>
                    <Label htmlFor="contact-name">{t('contact.name')}</Label>
                    <Input
                      id="contact-name"
                      type="text"
                      name="from_name"
                      placeholder={t('contact.namePlaceholder')}
                      readOnly={isLoading}
                      autoComplete="name"
                      maxLength={NAME_MAX}
                      required
                      aria-invalid={!!errors.from_name}
                      aria-describedby={describedBy(
                        errors.from_name && 'contact-name-error'
                      )}
                      onChange={(e) =>
                        handleFieldChange('from_name', e.target.value)
                      }
                      onBlur={(e) =>
                        handleFieldBlur('from_name', e.target.value)
                      }
                    />
                    {renderError('from_name')}
                  </FieldGroup>

                  <FieldGroup>
                    <Label htmlFor="contact-email">{t('contact.email')}</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      name="from_email"
                      placeholder={t('contact.emailPlaceholder')}
                      readOnly={isLoading}
                      autoComplete="email"
                      required
                      aria-invalid={!!errors.from_email}
                      aria-describedby={describedBy(
                        errors.from_email && 'contact-email-error'
                      )}
                      onChange={(e) =>
                        handleFieldChange('from_email', e.target.value)
                      }
                      onBlur={(e) =>
                        handleFieldBlur('from_email', e.target.value)
                      }
                    />
                    {renderError('from_email')}
                  </FieldGroup>

                  <FieldGroup>
                    <Label htmlFor="contact-message">
                      {t('contact.message')}
                    </Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder={t('contact.messagePlaceholder')}
                      readOnly={isLoading}
                      required
                      maxLength={MSG_MAX}
                      aria-invalid={!!errors.message}
                      aria-describedby={describedBy(
                        'contact-message-hint',
                        errors.message && 'contact-message-error'
                      )}
                      onChange={(e) => handleMessageChange(e.target.value)}
                      onBlur={(e) => handleFieldBlur('message', e.target.value)}
                    />
                    <FieldMeta>
                      <span id="contact-message-hint">
                        {t('contact.messageHint')}
                      </span>
                      <CharCount
                        aria-hidden="true"
                        $warn={MSG_MAX - msgLength <= MSG_WARN_REMAINING}
                        $over={msgLength >= MSG_MAX}
                      >
                        {msgLength} / {MSG_MAX}
                      </CharCount>
                    </FieldMeta>
                    <VisuallyHidden role="status">{charNote}</VisuallyHidden>
                    {renderError('message')}
                  </FieldGroup>

                  <VisuallyHidden role="status">
                    {isLoading ? t('contact.sending') : ''}
                  </VisuallyHidden>

                  {status === 'error' && (
                    <StatusMessage
                      role="alert"
                      variants={fadeVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <AlertIcon />
                      <span>{t('contact.error')}</span>
                    </StatusMessage>
                  )}

                  <div>
                    <SubmitButton
                      type="submit"
                      aria-disabled={isLoading}
                      icon={isLoading ? <Spinner /> : undefined}
                    >
                      {isLoading ? t('contact.sending') : t('contact.send')}
                    </SubmitButton>
                  </div>
                </Form>
              </>
            )}
          </FormPanel>
        </FormColumn>
      </Layout>
    </Container>
  );
};

export default Contact;
