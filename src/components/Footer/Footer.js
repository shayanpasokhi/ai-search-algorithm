import React from "react";
import classes from "./style.module.css";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3">
      <div className="container d-flex align-items-center">
        <a
          href="https://github.com/shayanpasokhi/ai-search-algorithm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none fs-6 text-dark"
        >
          <i className="bi bi-github me-2"></i>گیت هاب
        </a>
        <div className={classes["h-line"]}></div>
        <a
          href="https://forms.gle/GmNcXRqZszEDbeJr7"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none fs-6 text-dark"
        >
          <i class="bi bi-pencil-square me-2"></i>بازخورد
        </a>
        <div className={classes["h-line"]}></div>
        <span className="fs-6">
          <i class="bi bi-heart-fill me-2 text-danger"></i>تقدیم به استاد عزیزم رامین رهنمون
        </span>
      </div>
    </footer>
  );
};

export default Footer;
