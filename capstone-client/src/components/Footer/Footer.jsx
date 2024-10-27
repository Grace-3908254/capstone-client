import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="footer">
      <h2 className="footer__contact-title">Contact</h2>
      <section className="footer__contact">
        <div className="footer__contact-email">
          <p className="footer__contact-email-name">Email: </p>
          <a
            className="footer__contact-email-link"
            href="mailto:choore.11@gmail.com?subject=Emailing you about...&body=Hello Grace,"
          >
            choore.11@gmail.com
          </a>
        </div>

        <div className="footer__contact-linkedin">
          <p className="footer__contact-linkedin-name">LinkedIn: </p>
          <a
            className="footer__contact-linkedin-link"
            href="https://www.linkedin.com/in/grace-li-ba26a1323/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.linkedin.com/in/grace-li-ba26a1323/
          </a>
        </div>
      </section>
    </div>
  );
}
