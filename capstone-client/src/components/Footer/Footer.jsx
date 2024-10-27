import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <div>
      <section>
        <h2>Contact</h2>
        <div>
          <p>Email: </p>
          <a href="mailto:choore.11@gmail.com?subject=Emailing you about...&body=Hello Grace,">
            choore.11@gmail.com
          </a>
        </div>

        <div>
          <p>LinkedIn Profile: </p>
          <a
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
