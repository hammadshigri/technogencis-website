'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormValues } from './validation';
import { AnimatePresence, motion } from 'framer-motion';
import { submitContact } from '@/actions/contact';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactFormValues) {
    const result = await submitContact(values);
    if (!result.success) {
      throw new Error(result.error || 'Failed to send');
    }
    reset();
  }
  return (
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">Contact</h1>
          <p className="text-muted-foreground mb-6 max-w-prose">
            Tell us about your goals and we’ll get back to you within one
            business day.
          </p>
          <div className="rounded-xl border p-6 space-y-2">
            <div className="font-medium">Global Headquarters</div>
            <div className="text-sm text-muted-foreground">
              San Jose, CA — USA
            </div>
            <div className="text-sm">sales@technogencis.com</div>
          </div>
        </div>
        <div>
          <form
            className="grid grid-cols-1 gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="text-sm">
              Name
              <input
                className="mt-1 w-full border rounded p-2"
                placeholder="Your name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                {...register('name')}
              />
              <AnimatePresence initial={false}>
                {errors.name && (
                  <motion.div
                    key="name-error"
                    id="name-error"
                    role="alert"
                    aria-live="polite"
                    initial={{ height: 0, opacity: 0, y: -4 }}
                    animate={{ height: 'auto', opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-red-600 mt-1 overflow-hidden"
                  >
                    {errors.name.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </label>
            <label className="text-sm">
              Email
              <input
                className="mt-1 w-full border rounded p-2"
                placeholder="name@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                {...register('email')}
              />
              <AnimatePresence initial={false}>
                {errors.email && (
                  <motion.div
                    key="email-error"
                    id="email-error"
                    role="alert"
                    aria-live="polite"
                    initial={{ height: 0, opacity: 0, y: -4 }}
                    animate={{ height: 'auto', opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-red-600 mt-1 overflow-hidden"
                  >
                    {errors.email.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </label>
            <label className="text-sm">
              Company (optional)
              <input
                className="mt-1 w-full border rounded p-2"
                placeholder="Company"
                {...register('company')}
              />
            </label>
            <label className="text-sm">
              Subject
              <input
                className="mt-1 w-full border rounded p-2"
                placeholder="Subject"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                {...register('subject')}
              />
              <AnimatePresence initial={false}>
                {errors.subject && (
                  <motion.div
                    key="subject-error"
                    id="subject-error"
                    role="alert"
                    aria-live="polite"
                    initial={{ height: 0, opacity: 0, y: -4 }}
                    animate={{ height: 'auto', opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-red-600 mt-1 overflow-hidden"
                  >
                    {errors.subject.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </label>
            <label className="text-sm">
              Message
              <textarea
                className="mt-1 w-full border rounded p-2"
                placeholder="Message"
                rows={5}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                {...register('message')}
              />
              <AnimatePresence initial={false}>
                {errors.message && (
                  <motion.div
                    key="message-error"
                    id="message-error"
                    role="alert"
                    aria-live="polite"
                    initial={{ height: 0, opacity: 0, y: -4 }}
                    animate={{ height: 'auto', opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-red-600 mt-1 overflow-hidden"
                  >
                    {errors.message.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </label>
            <button
              type="submit"
              className="rounded bg-primary text-white px-4 py-2 disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending…' : 'Send'}
            </button>
          </form>
          <div className="mt-6 space-y-3">
            {isSubmitSuccessful && (
              <div
                className="rounded border p-3 text-green-700 bg-green-50"
                role="status"
              >
                Success: Your message was sent.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
