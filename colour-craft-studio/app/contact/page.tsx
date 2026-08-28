import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import {
  BUSINESS_ADDRESS_FULL,
  BUSINESS_EMAIL,
  BUSINESS_HOURS,
  BUSINESS_MAPS_EMBED_SRC,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Colour Craft Studio in Sandbaai, Hermanus. Book a colour consultation or ask us anything about our paint products and services.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-500 max-w-xl">
            Book a consultation, request a quote, or just say hello. We&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Business info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Visit Us</h2>
              <address className="not-italic text-gray-600 text-base leading-relaxed">
                <p className="font-medium text-gray-900">{BUSINESS_NAME}</p>
                <p>{BUSINESS_ADDRESS_FULL}</p>
              </address>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Contact Details</h3>
              <dl className="space-y-2 text-sm text-gray-600">
                <div className="flex gap-2">
                  <dt className="font-medium text-gray-800 w-16">Phone</dt>
                  <dd>
                    <a href={`tel:${BUSINESS_PHONE_TEL}`} className="text-blue-600 hover:underline">
                      {BUSINESS_PHONE}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-gray-800 w-16">Email</dt>
                  <dd>
                    <a href={`mailto:${BUSINESS_EMAIL}`} className="text-blue-600 hover:underline">
                      {BUSINESS_EMAIL}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Trading Hours</h3>
              <table className="w-full max-w-xs text-sm text-gray-600">
                <tbody>
                  {BUSINESS_HOURS.map(({ day, hours }) => (
                    <tr key={day} className="border-b border-gray-100 last:border-0">
                      <td className="py-1.5 pr-4 text-gray-800">{day}</td>
                      <td className="py-1.5 text-right font-medium">{hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Map embed */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Location</h3>
              <div className="rounded-2xl overflow-hidden border border-gray-200 h-56">
                <iframe
                  title="Colour Craft Studio location — Sandbaai, Hermanus"
                  src={BUSINESS_MAPS_EMBED_SRC}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
