import {FormEvent, useEffect, useId, useRef, useState} from 'react';
import {ArrowRight, Building2, Loader2, Mail, Phone, User, X} from 'lucide-react';

type ContactMeetingModalProps = {
  open: boolean;
  onClose: () => void;
};

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_FORM: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.name.trim()) {
    errors.name = 'Моля, въведете вашето име.';
  }
  if (!form.company.trim()) {
    errors.company = 'Моля, въведете име на фирма.';
  }
  if (!form.email.trim()) {
    errors.email = 'Моля, въведете имейл адрес.';
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = 'Моля, въведете валиден имейл адрес.';
  }

  return errors;
}

export function ContactMeetingModal({open, onClose}: ContactMeetingModalProps) {
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;

    setForm(INITIAL_FORM);
    setErrors({});
    setSubmitError(null);
    setSubmitted(false);
    setSubmitting(false);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !submitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, submitting]);

  if (!open) return null;

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors((prev) => {
        const next = {...prev};
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/book-meeting', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {error?: string};

      if (!response.ok) {
        setSubmitError(data.error || 'Неуспешно изпращане. Моля, опитайте отново.');
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError('Възникна мрежова грешка. Моля, опитайте отново.');
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    'w-full rounded-xl bg-brand-dark/70 border border-brand-medium/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-accent/60 focus:ring-2 focus:ring-brand-accent/20 transition-colors';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
        aria-label="Затвори"
        onClick={() => !submitting && onClose()}
      />

      <div className="relative w-full sm:max-w-lg bg-brand-deep border border-brand-medium/50 sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-5 sm:px-6 pt-5 pb-4 bg-brand-deep/95 backdrop-blur border-b border-brand-medium/40">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-1">
              Безплатна среща
            </p>
            <h2 id={titleId} className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Запазете среща
            </h2>
            <p className="text-sm text-neutral-300 mt-1 leading-relaxed">
              Попълнете формата и ще се свържем с вас за предварителна консултация.
            </p>
          </div>
          <button
            type="button"
            onClick={() => !submitting && onClose()}
            className="shrink-0 p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-brand-medium/50 transition-colors"
            aria-label="Затвори"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 sm:px-6 py-5 sm:py-6">
          {submitted ? (
            <div className="space-y-5 text-center py-4">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-brand-accent/15 border border-brand-accent/35 flex items-center justify-center">
                <Mail className="h-6 w-6 text-brand-accent" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Заявката е изпратена</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Благодарим ви! Ще се свържем с вас скоро на посочения имейл.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-hover text-white font-bold px-8 py-3 rounded-xl transition-colors"
              >
                Затвори
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="meeting-name" className="text-xs font-bold uppercase tracking-wider text-[#FFC19E]">
                  Вашето име <span className="text-brand-accent">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                  <input
                    ref={firstFieldRef}
                    id="meeting-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className={`${fieldClass} pl-10`}
                    placeholder="Иван Иванов"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'meeting-name-error' : undefined}
                  />
                </div>
                {errors.name && (
                  <p id="meeting-name-error" className="text-xs text-red-300">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="meeting-company" className="text-xs font-bold uppercase tracking-wider text-[#FFC19E]">
                  Име на фирма <span className="text-brand-accent">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                  <input
                    id="meeting-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={form.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    className={`${fieldClass} pl-10`}
                    placeholder="Пример ООД"
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? 'meeting-company-error' : undefined}
                  />
                </div>
                {errors.company && (
                  <p id="meeting-company-error" className="text-xs text-red-300">
                    {errors.company}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="meeting-email" className="text-xs font-bold uppercase tracking-wider text-[#FFC19E]">
                  Ел. поща <span className="text-brand-accent">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                  <input
                    id="meeting-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={`${fieldClass} pl-10`}
                    placeholder="ivan@firma.bg"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'meeting-email-error' : undefined}
                  />
                </div>
                {errors.email && (
                  <p id="meeting-email-error" className="text-xs text-red-300">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="meeting-phone" className="text-xs font-bold uppercase tracking-wider text-[#FFC19E]">
                  Телефон <span className="text-neutral-500 normal-case tracking-normal font-medium">(по желание)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                  <input
                    id="meeting-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className={`${fieldClass} pl-10`}
                    placeholder="+359 ..."
                  />
                </div>
              </div>

              {submitError && (
                <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-accent hover:bg-brand-accent-hover disabled:opacity-70 disabled:cursor-not-allowed text-white font-extrabold px-6 py-3.5 rounded-xl shadow-[0_10px_30px_rgba(255,140,66,0.25)] transition-all inline-flex items-center justify-center gap-2 border border-brand-accent"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Изпращане...</span>
                  </>
                ) : (
                  <>
                    <span>Изпрати заявка</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
