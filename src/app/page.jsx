"use client";
import Image from "next/image";
import React,{useState, useEffect} from "react";
import { useRouter } from 'next/navigation';
import MobileNavigation from '../components/MobileNavigation';
import { useGlobalContext } from "../context/GlobalProvider";

const FeaturedProducts = [
  {
    id: 1,
    name: "Turmeric Powder",
    image: "/images/Turmeric_Powder.png",
    price: "Rs.75.70",
    weight: "100gm"
  },
  {
    id: 2,
    name: "Curry Masala",
    image: "/images/Curry_Masala.png",
    price: "Rs.75.70",
    weight: "100gm"
  },
  {
    id: 3,
    name: "Red Chilly Powder",
    image: "/images/Red_Chilly_Powder.png",
    price: "Rs.75.70",
    weight: "100gm"
  },
  {
    id: 4,
    name: "Kulambu Chilly Masala",
    image: "/images/Kulambu_Chilly_Masala.png",
    price: "Rs.75.70",
    weight: "100gm"
  }
];

export default function Home() {
  const { cartData, setCartData, isAdminAuthenticated, logoutAdmin } = useGlobalContext();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const router = useRouter();
  
  const images = [
    "/images/sivaranjini 2 2.png",
    "/images/sivaranjini 3 3.png",
    "/images/sivaranjini 4 2.png"
  ];
  const testimonials=[
  {
    "name": "Murugan Pandian",
    "role": "Restaurant Owner – Erode",
    "testimonial": "We've been using Sivarajini Masala products in our kitchen for the last 6 months. The flavors are rich, and consistency is top-notch. Our biryani sales even increased after switching to their spices! A dependable choice for professionals.",
    "rating": 5
  },
  {
    "name": "Priya Ramesh",
    "role": "Home Cook – Salem",
    "testimonial": "I was introduced to Sivarajini by a friend, and I must say, their turmeric and sambar powders are far superior to anything I’ve used before. No artificial smell and feels very pure. My family loves the taste.",
    "rating": 5
  },
  {
    "name": "Raghavan R",
    "role": "Grocery Shop Owner – Tiruppur",
    "testimonial": "Customers in our area prefer this brand because it’s local and trustworthy. Repeat purchases have increased and the packaging is very eye-catching. Good quality, and the pricing is reasonable too.",
    "rating": 5
  },
  {
    "name": "Sumathi K",
    "role": "Food Blogger – Coimbatore",
    "testimonial": "I tried Sivarajini Masala for my YouTube recipe videos, and the response was excellent. Their masala gives a very authentic Tamil Nadu kitchen touch. Would highly recommend to anyone who wants genuine flavor.",
    "rating": 5
  }
]


  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);
  console.log("cartData", cartData);

  const handleAddToCart = (data) => {
    setCartData((prev) => [...prev, data]);
    console.log("Added to cart:", data);
  };

  // Contact form handlers
  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage('Thank you! Your message has been sent successfully.');
        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="body">
      {/* Hero sections  */}
      <section className="hero" id="hero">
        {/* <nav>
          <div className="logo">
            <Image
              src="/images/Sivaranjini_logo.png"
              alt="Logo"
              width={150}
              height={150}
            />
          </div>
          <div className="navigations">
            <ul>
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">About</a>
              </li>
              <li>
                <a href="">Products</a>
              </li>
              <li>
                <a href="">Contacts</a>
              </li>
            </ul>
          </div>
          <div className="CTA">
            <div className="icon_hold">
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
              <div className="icon_hold">
                <i class="fa-solid fa-cart-shopping"></i>
              </div>
              {
                isLogin ? (
                  <div className="icon_hold" onClick={()=> setIsLogin(false)}>
                    <i class="fa-solid fa-user"></i>
                  </div>
                ) : (
                  <button onClick={() => setIsLogin(true)}>Sign In</button>
                )
              }
          </div>
        </nav> */}
        
      <MobileNavigation />
        <main>
          <div className="carousel-container">
            <div className="carousel-wrapper">
              <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}>
                <div className="carousel-slide">
                  <Image
                    src="/images/sivaranjini 2 2.png"
                    alt="Slide 1"
                    width={800}
                    height={400}
                    className="carousel-image"
                  />
                </div>
                <div className="carousel-slide">
                  <Image
                    src="/images/sivaranjini 3 3.png"
                    alt="Slide 2"
                    width={800}
                    height={400}
                    className="carousel-image"
                  />
                </div>
                <div className="carousel-slide">
                  <Image
                    src="/images/sivaranjini 4 2.png"
                    alt="Slide 3"
                    width={800}
                    height={400}
                    className="carousel-image"
                  />
                </div>
              </div>
            </div>
            <div className="carousel-dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
          <div className="img_section_2">
            <img src="/images/offer_bg_sivaranjini.png" alt="" />
          </div>
        </main>
      </section>

      {/* section 2-product section*/}
      <section id="Products">
        <h1>Featured Products</h1>
        <div className="product-hold">
          {FeaturedProducts.map((product) => (
            <div className={product.id==1 ? "product_card turmeric" : "product_card"} key={product.id}>
              <div className="card_img_hold">
                <img src={product.image} alt="" />
              </div>
              <div className="card_content_hold">
                <h2>{product.name}</h2>
              <p className="gm">{product.weight}</p>
              <p className="price">{product.price}</p>
            </div>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
          ))}
        </div>
        <button onClick={() => {window.location.href="/products";}} className="btn">View All Products</button>
      </section>

      {/* section 3 - about us */}
      <section id="about">
        <div className="about_img_hold">
          <h1>About Us</h1>
          <p><span>____</span>At Sivaranjini Masala, we bring you the finest and most authentic spices, 
crafted with tradition and quality. Our journey is rooted in a passion for flavor,
ensuring every blend enhances your cooking with rich taste and aroma.Sourced 
from the best ingredients and processed with care, our masalas embody purity 
and freshness. Whether it's a touch of spice or a burst of flavor,Sivaranjini Masala
adds magic to every dish.</p>
          <img src="/images/Sivaranjini_logo.png" alt="About Us" />
        </div>
      </section>

      {/* testimonial sections */}
   

      {/* contact section  */}
      <section id="contact">
        <div className="contact-container">
          <h1>Contact Us</h1>
          
          <div className="contact-content">
            <div className="contact-info">
              <div className="office-info">
                <h3>OUR OFFICE</h3>
                <h2>Sivaranjini Masala</h2>
                <p>6/25, Narasimmapuram, Lakshmi nagar, Kuriyamuthur,</p>
                <p>Coimbatore: 641008, Tamil Nadu, India.</p>
                
                <div className="contact-details">
                  <h3>CONTACT INFORMATION</h3>
                  
            <p>+91 8610435965</p>
            <p>sivaranjinifoods@gmail.com</p>
                </div>
              </div>
              
              <div className="map-container">
                <div className="map-placeholder">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2755!2d77.0136!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDA2JzM2LjAiTiA3N8KwMDEnNDcuMCJF!5e0!3m2!1sen!2sin!4v1642412345678!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <h3>Leave A Message</h3>
              <form onSubmit={handleContactSubmit}>
                <input 
                  type="text" 
                  name="name"
                  placeholder="YOUR NAME" 
                  value={contactForm.name}
                  onChange={handleContactInputChange}
                  required 
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="EMAIL ADDRESS" 
                  value={contactForm.email}
                  onChange={handleContactInputChange}
                  required 
                />
                <input 
                  type="text" 
                  name="subject"
                  placeholder="SUBJECT" 
                  value={contactForm.subject}
                  onChange={handleContactInputChange}
                  required 
                />
                <textarea 
                  name="message"
                  placeholder="MESSAGE" 
                  rows="6" 
                  value={contactForm.message}
                  onChange={handleContactInputChange}
                  required
                ></textarea>
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span>Sending...</span>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT</span>
                      <i className="fa-solid fa-paper-plane"></i>
                    </>
                  )}
                </button>
                
                {submitMessage && (
                  <div className={`submit-message ${submitMessage.includes('successfully') ? 'success' : 'error'}`}>
                    <i className={`fa-solid ${submitMessage.includes('successfully') ? 'fa-check-circle' : 'fa-exclamation-triangle'}`}></i>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Address</h3>
            <p>6/25, Narasimmapuram</p>
            <p>Lakshmi nagar,</p>
            <p>Kuriyamuthur,</p>
            <p>Coimbatore,</p>
            <p>641008</p>
          </div>
          
          <div className="footer-section">
            <h3>About us</h3>
            <ul>
              <li><a href="/products">Products</a></li>
              <li><a href="#about">FAQ</a></li>
              <li><a href="#account">My Account</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Privacy policy</h3>
            <ul>
              <li><a href="#return">Return and Refund Policy</a></li>
              <li><a href="#copyright">Copyrights Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <p>+91 8610435965</p>
            <p>sivaranjinifoods@gmail.com</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>Copyright 2025 Sivaranjini Masala.</p>
          <p>All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
