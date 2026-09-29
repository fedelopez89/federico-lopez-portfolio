import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';
import enJson from '../../../i18n/locales/en/translation.json';
import esJson from '../../../i18n/locales/es/translation.json';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../../test/renderWithProviders';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { count?: number }) =>
      opts?.count !== undefined ? `${key}:${opts.count}` : key,
  }),
}));

const mocks = vi.hoisted(() => ({
  sendForm: vi.fn(),
  importFails: false,
}));

vi.mock('@emailjs/browser', () => ({
  get default() {
    if (mocks.importFails) throw new Error('Loading chunk failed');
    return { sendForm: mocks.sendForm };
  },
}));

const VALID_MESSAGE =
  'This is a sufficiently long message for the form validation.';

const fillValid = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText('contact.name'), 'John Doe');
  await user.type(screen.getByLabelText('contact.email'), 'john@example.com');
  await user.type(screen.getByLabelText('contact.message'), VALID_MESSAGE);
};

const submit = (user: ReturnType<typeof userEvent.setup>) =>
  user.click(screen.getByRole('button', { name: 'contact.send' }));

describe('Contact', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  beforeEach(() => {
    mocks.importFails = false;
    mocks.sendForm.mockReset();
    mocks.sendForm.mockResolvedValue({ text: 'OK' });
  });

  it('renders name, email, and message fields', () => {
    renderWithProviders(<Contact />);
    expect(screen.getByLabelText('contact.name')).toBeInTheDocument();
    expect(screen.getByLabelText('contact.email')).toBeInTheDocument();
    expect(screen.getByLabelText('contact.message')).toBeInTheDocument();
  });

  it('name, email, and message fields carry the required attribute', () => {
    renderWithProviders(<Contact />);
    for (const label of ['contact.name', 'contact.email', 'contact.message']) {
      const field = screen.getByLabelText(label);
      expect(field).toHaveAttribute('required');
      expect(field).not.toHaveAttribute('aria-required');
    }
  });

  it('submitting an empty form shows validation error messages', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);
    await submit(user);
    expect(
      screen.getByText('contact.validation.nameRequired')
    ).toBeInTheDocument();
    expect(
      screen.getByText('contact.validation.emailRequired')
    ).toBeInTheDocument();
    expect(
      screen.getByText('contact.validation.messageRequired')
    ).toBeInTheDocument();
  });

  it('sets aria-invalid to true on fields with errors after a failed submit', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);
    await submit(user);
    for (const label of ['contact.name', 'contact.email', 'contact.message']) {
      expect(screen.getByLabelText(label)).toHaveAttribute(
        'aria-invalid',
        'true'
      );
    }
  });

  it('aria-describedby only references ids that exist and includes the error when invalid', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    const assertRefsExist = () => {
      for (const label of [
        'contact.name',
        'contact.email',
        'contact.message',
      ]) {
        const ids = (
          screen.getByLabelText(label).getAttribute('aria-describedby') ?? ''
        )
          .split(' ')
          .filter(Boolean);
        ids.forEach((id) => expect(document.getElementById(id)).not.toBeNull());
      }
    };

    expect(screen.getByLabelText('contact.name')).not.toHaveAttribute(
      'aria-describedby'
    );
    expect(screen.getByLabelText('contact.message')).toHaveAttribute(
      'aria-describedby',
      'contact-message-hint'
    );
    assertRefsExist();

    await submit(user);

    expect(screen.getByLabelText('contact.name')).toHaveAttribute(
      'aria-describedby',
      'contact-name-error'
    );
    expect(screen.getByLabelText('contact.email')).toHaveAttribute(
      'aria-describedby',
      'contact-email-error'
    );
    expect(screen.getByLabelText('contact.message')).toHaveAttribute(
      'aria-describedby',
      'contact-message-hint contact-message-error'
    );
    assertRefsExist();
  });

  it('focuses the error summary after an invalid submit, with links to each field', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);
    await user.type(screen.getByLabelText('contact.name'), 'John');
    await submit(user);

    const summary = screen.getByRole('group', {
      name: 'contact.errorSummary:2',
    });
    expect(summary).toHaveFocus();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    // Focus lands after commit, so the fields are already marked invalid.
    expect(screen.getByLabelText('contact.email')).toHaveAttribute(
      'aria-invalid',
      'true'
    );

    await user.click(screen.getByRole('link', { name: 'contact.message' }));
    expect(screen.getByLabelText('contact.message')).toHaveFocus();
  });

  it('keeps an error until the field passes, then removes it and the summary when all are fixed', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);
    await submit(user);
    expect(screen.getByRole('group')).toHaveTextContent(
      'contact.errorSummary:3'
    );

    const name = screen.getByLabelText('contact.name');
    await user.type(name, 'J');
    expect(name).not.toHaveAttribute('aria-invalid', 'true');
    expect(
      screen.queryByText('contact.validation.nameRequired')
    ).not.toBeInTheDocument();
    expect(screen.getByRole('group')).toHaveTextContent(
      'contact.errorSummary:2'
    );

    const email = screen.getByLabelText('contact.email');
    await user.type(email, 'nope');
    expect(
      screen.getByText('contact.validation.emailInvalid')
    ).toBeInTheDocument();
    await user.type(email, '@x.io');
    expect(
      screen.queryByText(/contact\.validation\.email/)
    ).not.toBeInTheDocument();

    const message = screen.getByLabelText('contact.message');
    await user.type(message, 'short');
    expect(
      screen.getByText('contact.validation.messageTooShort')
    ).toBeInTheDocument();
    await user.type(message, ' and now it is long enough to pass validation.');
    expect(screen.queryByRole('group')).not.toBeInTheDocument();
  });

  it('validates on blur after a failed submit', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);
    await user.type(screen.getByLabelText('contact.name'), 'John');
    await submit(user);
    const name = screen.getByLabelText('contact.name');
    await user.clear(name);
    await user.tab();
    expect(
      screen.getByText('contact.validation.nameRequired')
    ).toBeInTheDocument();
  });

  it('calls emailjs.sendForm when the form is submitted with valid data', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);
    await fillValid(user);
    await submit(user);

    await waitFor(() => {
      expect(mocks.sendForm).toHaveBeenCalledOnce();
    });
    const form = mocks.sendForm.mock.calls[0][2] as HTMLFormElement;
    expect(form).toBeInstanceOf(HTMLFormElement);
    const data = new FormData(form);
    expect(data.get('from_name')).toBe('John Doe');
    expect(data.get('from_email')).toBe('john@example.com');
    expect(data.get('message')).toBe(VALID_MESSAGE);
  });

  it('announces sending politely and the success panel has no live role', async () => {
    const user = userEvent.setup();
    let resolveSend: (value: unknown) => void = () => {};
    mocks.sendForm.mockImplementation(
      () => new Promise((resolve) => (resolveSend = resolve))
    );
    renderWithProviders(<Contact />);
    await fillValid(user);
    await submit(user);

    const live = screen
      .getAllByRole('status')
      .find((el) => el.textContent === 'contact.sending');
    expect(live).toBeDefined();

    await act(async () => resolveSend({ text: 'OK' }));
    const heading = await screen.findByRole('heading', {
      name: 'contact.successTitle',
    });
    expect(heading.closest('[role="status"]')).toBeNull();
  });

  it('honeypot submissions show success without calling emailjs', async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<Contact />);
    await fillValid(user);
    const trap = container.querySelector<HTMLInputElement>(
      'input[name="_honeypot"]'
    )!;
    fireEvent.change(trap, { target: { value: 'bot' } });
    await submit(user);

    expect(
      await screen.findByRole('heading', { name: 'contact.successTitle' })
    ).toBeInTheDocument();
    expect(mocks.sendForm).not.toHaveBeenCalled();
  });

  it('drops the send-error banner when a re-submit is invalid', async () => {
    const user = userEvent.setup();
    mocks.sendForm.mockRejectedValueOnce(new Error('boom'));
    renderWithProviders(<Contact />);
    await fillValid(user);
    await submit(user);
    expect(await screen.findByRole('alert')).toHaveTextContent('contact.error');

    await user.clear(screen.getByLabelText('contact.name'));
    await submit(user);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('retries successfully after a send error', async () => {
    const user = userEvent.setup();
    mocks.sendForm.mockRejectedValueOnce(new Error('boom'));
    renderWithProviders(<Contact />);
    await fillValid(user);
    await submit(user);
    await screen.findByRole('alert');
    await submit(user);
    expect(
      await screen.findByRole('heading', { name: 'contact.successTitle' })
    ).toBeInTheDocument();
    expect(mocks.sendForm).toHaveBeenCalledTimes(2);
  });

  it('shows a status panel with a focused heading, then restores an empty form', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);
    await fillValid(user);
    await submit(user);

    const heading = await screen.findByRole('heading', {
      name: 'contact.successTitle',
    });
    expect(heading.closest('[role="status"]')).toBeNull();
    expect(heading).toHaveFocus();
    expect(screen.queryByLabelText('contact.name')).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'contact.sendAnother' })
    );

    const name = screen.getByLabelText('contact.name');
    expect(name).toHaveValue('');
    expect(name).toHaveFocus();
    expect(screen.getByLabelText('contact.message')).toHaveValue('');
  });

  it('prevents double submit while sending', async () => {
    const user = userEvent.setup();
    let resolveSend: (value: unknown) => void = () => {};
    mocks.sendForm.mockImplementation(
      () => new Promise((resolve) => (resolveSend = resolve))
    );
    renderWithProviders(<Contact />);
    await fillValid(user);
    await submit(user);

    const button = await screen.findByRole('button', {
      name: 'contact.sending',
    });
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button.closest('form')).toHaveAttribute('aria-busy', 'true');

    fireEvent.click(button);
    await user.type(screen.getByLabelText('contact.name'), '{Enter}');
    await waitFor(() => expect(mocks.sendForm).toHaveBeenCalledOnce());

    await act(async () => resolveSend({ text: 'OK' }));
    expect(await screen.findByText('contact.successTitle')).toBeInTheDocument();
    expect(mocks.sendForm).toHaveBeenCalledOnce();
  });

  it('shows an alert and keeps values when the emailjs chunk fails to load', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);
    await fillValid(user);
    mocks.importFails = true;
    await submit(user);

    expect(await screen.findByRole('alert')).toHaveTextContent('contact.error');
    expect(screen.getByLabelText('contact.name')).toHaveValue('John Doe');
    expect(screen.getByLabelText('contact.message')).toHaveValue(VALID_MESSAGE);
    expect(mocks.sendForm).not.toHaveBeenCalled();
    expect(
      screen.getByRole('button', { name: 'contact.send' })
    ).toBeInTheDocument();
  });

  it('shows an alert and keeps values when sending fails', async () => {
    const user = userEvent.setup();
    mocks.sendForm.mockRejectedValue(new Error('boom'));
    renderWithProviders(<Contact />);
    await fillValid(user);
    await submit(user);

    expect(await screen.findByRole('alert')).toHaveTextContent('contact.error');
    expect(screen.getByLabelText('contact.email')).toHaveValue(
      'john@example.com'
    );
  });

  it('copies the email address and announces it politely', async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, 'writeText');
    renderWithProviders(<Contact />);

    await user.click(screen.getByRole('button', { name: 'contact.copyEmail' }));

    expect(writeText).toHaveBeenCalledWith('fede.lopez89@gmail.com');
    expect(await screen.findByText('contact.copied')).toBeInTheDocument();
    expect(
      screen.getByText('contact.copied').closest('[role="status"]')
    ).not.toBeNull();
  });

  it('handles clipboard failure gracefully', async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(
      new Error('denied')
    );
    renderWithProviders(<Contact />);

    await user.click(screen.getByRole('button', { name: 'contact.copyEmail' }));

    expect(await screen.findByText('contact.copyFailed')).toBeInTheDocument();
  });

  it('announces the message length only when crossing thresholds', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);
    const message = screen.getByLabelText('contact.message');
    const regions = () =>
      screen
        .getAllByRole('status')
        .map((el) => el.textContent)
        .join('|');

    await user.type(message, 'abc');
    expect(regions()).not.toContain('charNote');
    expect(screen.getByText('3 / 300')).toBeInTheDocument();

    await user.type(message, 'x'.repeat(37));
    expect(regions()).toContain('contact.charNote.minReached');

    fireEvent.change(message, { target: { value: 'y'.repeat(279) } });
    expect(regions()).not.toContain('contact.charNote.remaining');
    fireEvent.change(message, { target: { value: 'y'.repeat(280) } });
    expect(regions()).toContain('contact.charNote.remaining:20');
    fireEvent.change(message, { target: { value: 'y'.repeat(300) } });
    expect(regions()).toContain('contact.charNote.limit');
  });

  it('does not count leading whitespace toward the minimum length', async () => {
    renderWithProviders(<Contact />);
    const message = screen.getByLabelText('contact.message');
    fireEvent.change(message, { target: { value: ' '.repeat(45) } });
    expect(
      screen
        .getAllByRole('status')
        .some((el) => el.textContent?.includes('minReached'))
    ).toBe(false);
  });

  it('ships plural and parity keys in both locales', () => {
    const flat = (o: Record<string, unknown>, p = ''): string[] =>
      Object.entries(o).flatMap(([k, v]) =>
        typeof v === 'object' && v !== null
          ? flat(v as Record<string, unknown>, `${p}${k}.`)
          : [`${p}${k}`]
      );
    const en = flat(enJson.contact).sort();
    expect(flat(esJson.contact).sort()).toEqual(en);
    for (const key of [
      'errorSummary_one',
      'errorSummary_other',
      'charNote.remaining_one',
      'charNote.remaining_other',
    ]) {
      expect(en).toContain(key);
    }
  });
});
