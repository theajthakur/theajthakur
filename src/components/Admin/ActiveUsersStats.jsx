import React, { useEffect, useState } from "react";
import { Users, Link } from "lucide-react";

export default function AnalyticsCards() {
  const data = {
    today: [
      {
        source: "(direct)",
        medium: "(none)",
        activeUsers: 1,
      },
      {
        source: "(not set)",
        medium: "(not set)",
        activeUsers: 1,
      },
    ],
    yesterday: [
      {
        source: "(direct)",
        medium: "(none)",
        activeUsers: 1,
      },
      {
        source: "linkedin.com",
        medium: "referral",
        activeUsers: 1,
      },
    ],
    thisWeek: [
      {
        source: "(direct)",
        medium: "(none)",
        activeUsers: 2,
      },
      {
        source: "(not set)",
        medium: "(not set)",
        activeUsers: 1,
      },
      {
        source: "linkedin.com",
        medium: "referral",
        activeUsers: 1,
      },
    ],
    thisMonth: [
      {
        source: "(direct)",
        medium: "(none)",
        activeUsers: 7,
      },
      {
        source: "(not set)",
        medium: "(not set)",
        activeUsers: 1,
      },
      {
        source: "linkedin.com",
        medium: "referral",
        activeUsers: 1,
      },
    ],
  };
  function renderItem(item, index) {
    return (
      <div key={index} className="col-sm-6 col-md-4 col-lg-3 mb-4">
        <div className="card h-100 shadow-sm">
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-center mb-3">
                <Users size={20} className="me-2 text-primary" />
                <h6 className="mb-0 text-truncate" title={item.source}>
                  {item.source}
                </h6>
              </div>
              <p className="mb-1 text-muted text-truncate" title={item.medium}>
                <Link size={16} className="me-1" />
                {item.medium}
              </p>
            </div>
            <div className="mt-3 fw-bold fs-5 text-end">{item.activeUsers}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {Object.entries(data).map(([period, items]) => (
        <section key={period} className="mb-5">
          <h4 className="mb-3 text-capitalize">
            {period.replace(/([A-Z])/g, " $1")}
          </h4>
          <div className="row">{items.map(renderItem)}</div>
        </section>
      ))}
    </div>
  );
}
