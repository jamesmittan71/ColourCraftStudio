import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Colour Craft Studio in Hermanus. Book a colour consultation or ask us anything about our paint products and services.',
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
          {/* Form */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>

          {/* Business info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Visit Us</h2>
              <address className="not-italic text-gray-600 space-y-2 text-sm leading-relaxed">
                <p className="font-medium text-gray-900">Colour Craft Studio</p>
                <p>Hermanus, Western Cape</p>
                <p>South Africa, 7200</p>
              </address>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Contact Details</h3>
              <dl className="space-y-2 text-sm text-gray-600">
                <div className="flex gap-2">
                  <dt className="font-medium text-gray-800 w-16">Phone</dt>
                  <dd>
                    <a href="tel:+27280000000" className="text-blue-600 hover:underline">
                      +27 (0)28 000 0000
                    </a>
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-gray-800 w-16">Email</dt>
                  <dd>
                    <a href="mailto:info@colourcraftstudio.co.za" className="text-blue-600 hover:underline">
                      info@colourcraftstudio.co.za
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Trading Hours</h3>
              <dl className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between max-w-xs">
                  <dt>Monday – Friday</dt>
                  <dd className="font-medium">8:00 – 17:00</dd>
                </div>
                <div className="flex justify-between max-w-xs">
                  <dt>Saturday</dt>
                  <dd className="font-medium">9:00 – 13:00</dd>
                </div>
                <div className="flex justify-between max-w-xs">
                  <dt>Sunday & Public Holidays</dt>
                  <dd className="font-medium">Closed</dd>
                </div>
              </dl>
            </div>

            {/* Map embed placeholder */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Location</h3>
              <div className="rounded-2xl overflow-hidden border border-gray-200 h-56">
                <iframe
                  title="Colour Craft Studio location — Hermanus, Western Cape"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26470.01!2d19.2166!3d-34.4187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcdfe8fb5b5d4a1%3A0x2b0f5a0b2b2b2b2b!2sHermanus%2C%20Western%20Cape!5e0!3m2!1sen!2sza!4v1699999999999"
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
        </div>
      </section>
    </>
  );
}
