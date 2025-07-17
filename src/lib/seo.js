// SEO Configuration for Sivaranjini Masala
export const seoConfig = {
  site: {
    name: "Sivaranjini Masala",
    description: "Premium authentic Indian spices and masala from Tamil Nadu",
    url: "https://sivaranjinimasala.com",
    ogImage: "/images/sivaranjini 2 2.png",
    themeColor: "#99BD98",
    twitterHandle: "@sivaranjinimasala",
  },
  
  business: {
    name: "Sivaranjini Masala",
    address: {
      street: "6/25, Narasimmapuram, Lakshmi nagar, Kuriyamuthur",
      city: "Coimbatore",
      state: "Tamil Nadu",
      postalCode: "641008",
      country: "India",
    },
    contact: {
      phone: "+91-8989999999",
      email: "sivaranjinimasala18@gmail.com",
    },
    coordinates: {
      latitude: 11.0168,
      longitude: 77.0136,
    },
    rating: {
      value: 4.8,
      count: 150,
    },
  },
  
  keywords: {
    primary: [
      "Sivaranjini Masala",
      "Indian spices",
      "Tamil Nadu spices",
      "authentic spices",
      "premium masala",
    ],
    secondary: [
      "turmeric powder",
      "curry masala",
      "red chilly powder",
      "sambar powder",
      "rasam powder",
      "garam masala",
      "coriander powder",
      "traditional spices",
      "Coimbatore spices",
      "South Indian masala",
      "organic spices",
      "pure spices",
      "quality masala",
      "Indian cooking spices",
      "buy spices online",
    ],
  },
  
  pages: {
    home: {
      title: "Premium Authentic Indian Spices & Masala - Sivaranjini Masala",
      description: "Shop premium authentic Indian spices and masala from Sivaranjini Masala. Fresh turmeric powder, curry masala, red chilly powder, and traditional Tamil Nadu spices. Free delivery across India.",
    },
    products: {
      title: "Premium Indian Spices & Masala Products - Sivaranjini Masala",
      description: "Browse our complete collection of premium Indian spices and masala. Turmeric powder, curry masala, red chilly powder, sambar powder, and more traditional Tamil Nadu spices.",
    },
    trackOrder: {
      title: "Track Your Order - Sivaranjini Masala",
      description: "Track your Sivaranjini Masala order status and delivery progress. Enter your Order ID and phone number to get real-time updates on your spice delivery.",
    },
    cart: {
      title: "Shopping Cart - Sivaranjini Masala",
      description: "Review your selected premium Indian spices and masala products. Secure checkout and fast delivery of authentic Tamil Nadu spices.",
    },
  },
  
  socialMedia: {
    facebook: "https://www.facebook.com/sivaranjinimasala",
    instagram: "https://www.instagram.com/sivaranjinimasala",
    twitter: "https://www.twitter.com/sivaranjinimasala",
    youtube: "https://www.youtube.com/sivaranjinimasala",
  },
  
  structuredData: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Sivaranjini Masala",
      "description": "Premium authentic Indian spices and masala manufacturer",
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
      ]
    },
    
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://sivaranjinimasala.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Products",
          "item": "https://sivaranjinimasala.com/products"
        }
      ]
    },
    
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What makes Sivaranjini Masala spices special?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our spices are sourced from the finest ingredients in Tamil Nadu, processed with traditional methods, and packed fresh to maintain authentic flavor and aroma."
          }
        },
        {
          "@type": "Question",
          "name": "Do you deliver across India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we provide free delivery across India for all our premium spice products with secure packaging."
          }
        },
        {
          "@type": "Question",
          "name": "Are your spices organic and pure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all our spices are pure, organic, and free from artificial additives or preservatives."
          }
        }
      ]
    }
  },
  
  analytics: {
    googleAnalytics: "G-XXXXXXXXXX", // Replace with actual GA4 ID
    googleTagManager: "GTM-XXXXXXX", // Replace with actual GTM ID
  },
  
  verification: {
    google: "your-google-search-console-verification-code",
    bing: "your-bing-webmaster-verification-code",
  },
};

export default seoConfig;
