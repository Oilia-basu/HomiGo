// Support.jsx

import "./Support.css";

const Support = () => {
  return (
    <section className="support-section">
      <div className="support-container">
        <div className="support-content">
          <span className="support-badge">Need Help?</span>

          <h2>We're Here to Support You</h2>

          <p>
            Have a question, facing an issue, or need help with a service?
            Our support team is here to help you.
          </p>

          <div className="support-options">
            <div className="support-card">
              <div className="support-icon">📞</div>
              <div>
                <h4>Call Us</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="support-card">
              <div className="support-icon">✉️</div>
              <div>
                <h4>Email Us</h4>
                <p>support@example.com</p>
              </div>
            </div>

            <div className="support-card">
              <div className="support-icon">💬</div>
              <div>
                <h4>Live Chat</h4>
                <p>Chat with our support team</p>
              </div>
            </div>
          </div>

          <button className="support-btn">
            Contact Support
          </button>
        </div>

        <div className="support-image">
          <div className="support-circle">
            🎧
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;