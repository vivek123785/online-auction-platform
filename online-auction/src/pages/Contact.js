import React, { useState } from "react";
import "../styles/Contact.css"; // Ensure this CSS file exists

const Contact = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State for submission status
  const [status, setStatus] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulating a backend response
    setTimeout(() => {
      setStatus("Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    }, 1000);
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out!</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Send Message</button>
      </form>

      {status && <p className="success-message">{status}</p>}
    </div>
  );
};

export default Contact;
