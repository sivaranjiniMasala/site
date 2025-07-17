import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "../components/ClientLayout";
import GlobalProvider from "../context/GlobalProvider";



export const metadata = {
  title: {
    default: "Sivaranjini Masala - Premium Authentic Indian Spices & Masala",
    template: "%s | Sivaranjini Masala"
  },
  description: "Discover premium authentic Indian spices and masala from Sivaranjini Masala. Fresh turmeric powder, curry masala, red chilly powder, and traditional Tamil Nadu spices. Order online for pure, quality spices delivered to your door.",
  keywords: [
    "Sivaranjini Masala",
    "Indian spices",
    "Tamil Nadu spices",
    "turmeric powder",
    "curry masala",
    "red chilly powder",
    "authentic spices",
    "premium masala",
    "traditional spices",
    "Coimbatore spices",
    "South Indian masala",
    "organic spices",
    "pure spices",
    "quality masala",
    "Indian cooking spices"
  ],
  authors: [{ name: "Sivaranjini Masala" }],
  creator: "Sivaranjini Masala",
  publisher: "Sivaranjini Masala",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sivaranjinimasala.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sivaranjinimasala.com',
    title: 'Sivaranjini Masala - Premium Authentic Indian Spices & Masala',
    description: 'Discover premium authentic Indian spices and masala from Sivaranjini Masala. Fresh turmeric powder, curry masala, red chilly powder, and traditional Tamil Nadu spices.',
    siteName: 'Sivaranjini Masala',
    images: [
      {
        url: '/images/Sivaranjini_logo.png',
        width: 1200,
        height: 630,
        alt: 'Sivaranjini Masala - Premium Indian Spices',
      },
      {
        url: '/images/sivaranjini 2 2.png',
        width: 800,
        height: 600,
        alt: 'Sivaranjini Masala Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sivaranjini Masala - Premium Authentic Indian Spices & Masala',
    description: 'Discover premium authentic Indian spices and masala from Sivaranjini Masala. Fresh turmeric powder, curry masala, red chilly powder.',
    images: ['/images/Sivaranjini_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'food',
  classification: 'business',
  other: {
    'business:contact_data:locality': 'Coimbatore',
    'business:contact_data:region': 'Tamil Nadu',
    'business:contact_data:country_name': 'India',
    'business:contact_data:postal_code': '641008',
    'business:contact_data:street_address': '6/25, Narasimmapuram, Lakshmi nagar, Kuriyamuthur',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sivaranjini Masala",
    "description": "Premium authentic Indian spices and masala manufacturer in Coimbatore, Tamil Nadu",
    "url": "https://sivaranjinimasala.com",
    "logo": "https://sivaranjinimasala.com/images/Sivaranjini_logo.png",
    "image": "https://sivaranjinimasala.com/images/sivaranjini 2 2.png",
    "telephone": "+91-8989999999",
    "email": "sivaranjinimasala18@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "6/25, Narasimmapuram, Lakshmi nagar, Kuriyamuthur",
      "addressLocality": "Coimbatore",
      "addressRegion": "Tamil Nadu",
      "postalCode": "641008",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 11.0168,
      "longitude": 77.0136
    },
    "sameAs": [
      "https://www.facebook.com/sivaranjinimasala",
      "https://www.instagram.com/sivaranjinimasala",
      "https://www.twitter.com/sivaranjinimasala"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8989999999",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "ta"]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Sivaranjini Masala Products",
    "description": "Premium authentic Indian spices and masala products",
    "numberOfItems": 4,
    "itemListElement": [
      {
        "@type": "Product",
        "position": 1,
        "name": "Turmeric Powder",
        "description": "Premium quality Turmeric Powder from Sivaranjini Masala",
        "image": "https://sivaranjinimasala.com/images/Turmeric_Powder.png",
        "offers": {
          "@type": "Offer",
          "price": "75.70",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Sivaranjini Masala"
          }
        },
        "brand": {
          "@type": "Brand",
          "name": "Sivaranjini Masala"
        },
        "category": "Food & Beverages > Spices & Seasonings"
      },
      {
        "@type": "Product",
        "position": 2,
        "name": "Curry Masala",
        "description": "Premium quality Curry Masala from Sivaranjini Masala",
        "image": "https://sivaranjinimasala.com/images/Curry_Masala.png",
        "offers": {
          "@type": "Offer",
          "price": "75.70",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Sivaranjini Masala"
          }
        },
        "brand": {
          "@type": "Brand",
          "name": "Sivaranjini Masala"
        },
        "category": "Food & Beverages > Spices & Seasonings"
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <meta name="theme-color" content="#99BD98" />
        <meta name="msapplication-TileColor" content="#99BD98" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      </head>
      <body className="body" style={{ padding: "0", margin: "0", fontFamily: "sans-serif" }}>
        <ClientLayout>
          <GlobalProvider>
              {children}
            </GlobalProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
