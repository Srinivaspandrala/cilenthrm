import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";

const AdvancedEmailForm = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate email format
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Send email with EmailJS
  const sendEmail = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ message: "All fields are required!", type: "error" });
      return;
    }

    if (!isValidEmail(formData.email)) {
      setStatus({ message: "Invalid email format!", type: "error" });
      return;
    }

    setLoading(true);
    
    try {
      const response = await emailjs.sendForm(
        "service_7jx235f",    // Replace with EmailJS service ID
        "template_7eged1y",   // Replace with EmailJS template ID
        formRef.current,
        "B3ZbGBy2RTRyoJd5i"        // Replace with EmailJS user ID (public key)
      );
      
      console.log("SUCCESS!", response);
      setStatus({ message: "Email sent successfully!", type: "success" });
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      console.error("FAILED...", error);
      setStatus({ message: "Failed to send email. Try again!", type: "error" });
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center", border: "1px solid #ccc", borderRadius: "10px", background: "#f9f9f9" }}>
      <h2>Send an Email</h2>
      <form ref={formRef} onSubmit={sendEmail}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          style={{ width: "100%", height: "100px", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        ></textarea>
        <button
          type="submit"
          style={{ background: loading ? "#ccc" : "#28a745", color: "#fff", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: loading ? "not-allowed" : "pointer" }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Email"}
        </button>
      </form>
      {status.message && (
        <p style={{ marginTop: "10px", color: status.type === "success" ? "green" : "red" }}>
          {status.message}
        </p>
      )}
    </div>
  );
};

export default AdvancedEmailForm;
