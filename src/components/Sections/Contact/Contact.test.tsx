import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';
import { renderWithProviders, setupTestEnvironment } from '../../../test/renderWithProviders';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@emailjs/browser', () => ({
  default: {
    sendForm: vi.fn().mockResolvedValue({ text: 'OK' }),
  },
}));

import emailjs from '@emailjs/browser';

describe('Contact', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  beforeEach(() => {
    vi.mocked(emailjs.sendForm).mockClear();
  });

  it('renders name, email, and message fields', () => {
    renderWithProviders(<Contact />);
    expect(screen.getByLabelText('contact.name')).toBeInTheDocument();
    expect(screen.getByLabelText('contact.email')).toBeInTheDocument();
    expect(screen.getByLabelText('contact.message')).toBeInTheDocument();
  });

  it('name, email, and message fields carry the required attribute', () => {
    renderWithProviders(<Contact />);
    expect(screen.getByLabelText('contact.name')).toHaveAttribute('required');
    expect(screen.getByLabelText('contact.email')).toHaveAttribute('required');
    expect(screen.getByLabelText('contact.message')).toHaveAttribute('required');
  });

  it('submitting an empty form shows validation error messages', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);
    await user.click(screen.getByRole('button', { name: 'contact.send' }));
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
    await user.click(screen.getByRole('button', { name: 'contact.send' }));
    expect(screen.getByLabelText('contact.name')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByLabelText('contact.email')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByLabelText('contact.message')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('each field error is associated with the field via aria-describedby', () => {
    renderWithProviders(<Contact />);
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
      expect.stringContaining('contact-message-error')
    );
  });

  it('calls emailjs.sendForm when the form is submitted with valid data', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.type(screen.getByLabelText('contact.name'), 'John Doe');
    await user.type(
      screen.getByLabelText('contact.email'),
      'john@example.com'
    );
    await user.type(
      screen.getByLabelText('contact.message'),
      'This is a sufficiently long message for the form validation.'
    );
    await user.click(screen.getByRole('button', { name: 'contact.send' }));

    await waitFor(() => {
      expect(vi.mocked(emailjs.sendForm)).toHaveBeenCalledOnce();
    });
  });
});
