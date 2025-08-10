# Juneja Electricals Website — Project Overview

## 1. Introduction  
The Juneja Electricals Website is a professional e-commerce platform designed to showcase electrical products and services for Juneja Electricals, a local business. The project aims to establish a digital presence that attracts new customers, facilitates product discovery, and streamlines order management. By creating an intuitive and responsive website, the project addresses the need for easy access to products and business information for customers, while also providing an efficient admin interface for managing inventory and sales.

## 2. Goals and Objectives  
- Develop a user-friendly platform for customers to browse and purchase electrical products online.  
- Implement a secure role-based authentication system to differentiate between admin and customer access.  
- Provide an admin dashboard for product management, order tracking, and stock monitoring.  
- Enable automated email billing for both customers and administrators to enhance communication.  
- Ensure responsiveness and offline capabilities by implementing Progressive Web App (PWA) features.  
- Create a foundation that supports future enhancements like product reviews and analytics.

## 3. Features Summary  
- Responsive design compatible with desktops, tablets, and mobile devices.  
- User registration and login with role-based access control (admin and customer).  
- Admin dashboard enabling add, update, delete, and view operations on products.  
- Product browsing and ordering functionality for customers.  
- Automated billing emails sent upon order completion.  
- Real-time stock alerts sent to the admin when product quantity is low.  
- Contact page integrating Google Maps and multiple communication channels.  
- Progressive Web App support for offline usage and improved performance.

## 4. Technology Stack  
- **Frontend:** React for building a dynamic and responsive user interface, styled with Tailwind CSS for rapid UI development.  
- **Backend:** Node.js and Express.js to create RESTful APIs for authentication, product management, and order processing.  
- **Database:** MongoDB to store users, products, orders, and billing information with a flexible schema.  
- **Email Service:** Nodemailer for sending automated billing and notification emails.  
- **Deployment:** Frontend hosted on Netlify and backend deployed on Render for scalability and ease of maintenance.  
- **Version Control:** Git and GitHub for code management and collaboration.

## 5. Future Enhancements  
- Build an Admin Analytics Dashboard to visualize sales data, revenue, and product performance.  
- Implement a Customer Reviews and Ratings system to enhance user engagement and trust.  
- Automate post-purchase feedback emails to collect valuable customer insights.  
- Introduce loyalty and referral programs to incentivize repeat business.  
- Improve the mobile experience with native app-like features.  
- Integrate third-party services for enhanced payment processing and marketing.

## 6. Deployment and Testing  
The frontend is deployed on Netlify and the backend on Render, enabling continuous deployment workflows through GitHub. Manual testing was performed across devices to ensure responsive design and functional correctness. Basic unit testing for critical backend routes is planned for future iterations.
- **Uptime Maintenance:** Since the backend is hosted on Render’s free tier, it can enter sleep mode after 50 seconds of inactivity, leading to slow responses during cold starts. To maintain responsiveness, an UptimeRobot monitor pings a lightweight /ping endpoint every 5 minutes. This prevents the server from idling and ensures faster response times for users. The monitor is configured with a 15-second timeout to avoid false downtime alerts.


## 10. Conclusion  
This project provided hands-on experience building a full-stack e-commerce web application with real-world features. It strengthened skills in React, Node.js, database design, email automation, and deployment. The modular design and thorough documentation lay a strong foundation for further enhancements, positioning the project as a strong portfolio piece for placements and professional growth.