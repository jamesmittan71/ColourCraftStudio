export const BUSINESS_NAME = 'Colour Craft Studio';
export const BUSINESS_ADDRESS = 'Unit 1&2, 98 Bergsig St, Sandbaai, 7200';
export const BUSINESS_ADDRESS_FULL =
  'Unit 1&2, 98 Bergsig St, Sandbaai, 7200, Western Cape, South Africa';
export const BUSINESS_PHONE = '028 312 3745';
export const BUSINESS_PHONE_TEL = '+27283123745';
export const BUSINESS_EMAIL = 'info@colourcraft.co.za';

// Approximate coordinates for Sandbaai, Hermanus, Western Cape
export const BUSINESS_GEO = {
  latitude: -34.3978,
  longitude: 19.2242,
};

export const BUSINESS_MAPS_EMBED_SRC =
  'https://www.google.com/maps?q=Unit+1%262,+98+Bergsig+St,+Sandbaai,+7200,+Western+Cape,+South+Africa&output=embed';

export interface BusinessHour {
  day: string;
  hours: string;
}

export const BUSINESS_HOURS: BusinessHour[] = [
  { day: 'Monday', hours: '7:00 AM – 4:30 PM' },
  { day: 'Tuesday', hours: '7:00 AM – 4:30 PM' },
  { day: 'Wednesday', hours: '7:00 AM – 4:30 PM' },
  { day: 'Thursday', hours: '7:00 AM – 4:30 PM' },
  { day: 'Friday', hours: '7:00 AM – 3:00 PM' },
  { day: 'Saturday', hours: '7:30 AM – 12:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

// Schema.org opening hours spec — one entry per open day
export const BUSINESS_OPENING_HOURS_SPECIFICATION = [
  { dayOfWeek: 'Monday', opens: '07:00', closes: '16:30' },
  { dayOfWeek: 'Tuesday', opens: '07:00', closes: '16:30' },
  { dayOfWeek: 'Wednesday', opens: '07:00', closes: '16:30' },
  { dayOfWeek: 'Thursday', opens: '07:00', closes: '16:30' },
  { dayOfWeek: 'Friday', opens: '07:00', closes: '15:00' },
  { dayOfWeek: 'Saturday', opens: '07:30', closes: '12:00' },
];
