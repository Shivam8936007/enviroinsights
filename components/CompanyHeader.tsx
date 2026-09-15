"use client";

import {
  Globe2,
  MapPin,
  Clock,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";




const companies = [
  "AROMA DELIGHTS PVT LTD",
  "LAWRENCE ROAD INDUSTRIAL AREA CETP",
  "GLS FILMS",
  "MOTHER DAIRY FRUIT & VEGETABLE PVT LTD",
  "PRECISION STAMPING",
  "BURMAN ESTATE PRIVATE LIMITED",
  "KARNAL CEMENT WORKS",
];

export default function CompanyHeader() {
  const [company, setCompany] = useState(companies[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="company-header">

      <div className="company-header-top">

        <h1>
          {company}
        </h1>

        <div className={`company-select ${isOpen ? "open" : ""}`}>
          <button
            type="button"
            className="company-select-trigger"
            onClick={() => setIsOpen((value) => !value)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <span>{company}</span>
            <ChevronDown size={18} aria-hidden="true" />
          </button>

          {isOpen && (
            <div className="company-select-menu" role="listbox" aria-label="Select company">
              {companies.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={option === company}
                  className={option === company ? "selected" : ""}
                  onClick={() => {
                    setCompany(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>

      <div className="company-info">

        <div>
          <Globe2 size={18} />
          <span>Haryana</span>
        </div>

        <div>
          <MapPin size={18} />
          <span>karnal</span>
        </div>

        <div>
          <Clock size={18} />
          <span>05-09-2026 21:44 PM</span>
        </div>

      </div>

    </section>
  );
}