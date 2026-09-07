"use client";

import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleX,
  Monitor,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import "../app/site-status.css";

type SiteStatus = "active" | "attention" | "inactive";

interface Site {
  id: number;
  name: string;
  city: string;
  state: string;
  industry: string;
  code: string;
  lastOnline: string;
  status: SiteStatus;
}

const sites: Site[] = [
  {
    id: 1,
    name: "LAWRENCE ROAD INDUSTRIAL AREA CETP (12 MLD)",
    city: "SAKARPUR",
    state: "Delhi",
    industry: "CETP",
    code: "DPCC",
    lastOnline: "07-09-2026 21:45:55",
    status: "active",
  },
  {
    id: 2,
    name: "GLS Films",
    city: "BILAS PUR",
    state: "Haryana",
    industry: "METAL PROCESSING",
    code: "",
    lastOnline: "07-09-2026 21:45:55",
    status: "active",
  },
  {
    id: 3,
    name: "Mother Dairy Fruit & Vegetable pvt ltd",
    city: "mangolpuri",
    state: "Delhi",
    industry: "Food Dairy Beverages",
    code: "123",
    lastOnline: "07-09-2026 21:45:12",
    status: "active",
  },
  {
    id: 4,
    name: "Technomech(India)",
    city: "JHAJJAR",
    state: "Haryana",
    industry: "FOUNDRY",
    code: "",
    lastOnline: "07-09-2026 21:45:56",
    status: "active",
  },
  {
    id: 5,
    name: "MAK ISPAT",
    city: "BAHADURGHH",
    state: "Haryana",
    industry: "Alloy Processing",
    code: "",
    lastOnline: "07-09-2026 21:45:56",
    status: "active",
  },
  {
    id: 6,
    name: "VRB Consumers Pvt Ltd",
    city: "behror",
    state: "Rajasthan",
    industry: "Food Dairy Beverages",
    code: "",
    lastOnline: "24-07-2026 17:47:21",
    status: "inactive",
  },
  {
    id: 7,
    name: "PRECISION STAMPING",
    city: "FARIDABAD",
    state: "Haryana",
    industry: "Manufacturing",
    code: "123",
    lastOnline: "07-09-2026 21:45:56",
    status: "active",
  },
  {
    id: 8,
    name: "Jaycee Castalloys Private Limited",
    city: "village chulliana",
    state: "Haryana",
    industry: "METAL PROCESSING",
    code: "",
    lastOnline: "07-09-2026 21:45:56",
    status: "active",
  },
  {
    id: 9,
    name: "JAYCEE CASTALLOYS PVT LTD",
    city: "JHAJJAR",
    state: "Haryana",
    industry: "Others (Metal Surface Treatment)",
    code: "",
    lastOnline: "07-09-2026 21:45:56",
    status: "attention",
  },
  {
    id: 10,
    name: "Burman Estate Private Limited",
    city: "GURGAON",
    state: "Haryana",
    industry: "HOTEL",
    code: "1234",
    lastOnline: "07-09-2026 21:45:55",
    status: "active",
  },
  {
    id: 11,
    name: "Haryana Steel Works",
    city: "PANIPAT",
    state: "Haryana",
    industry: "Steel Processing",
    code: "456",
    lastOnline: "07-09-2026 21:44:38",
    status: "active",
  },
  {
    id: 12,
    name: "Northern Chemicals Limited",
    city: "SONIPAT",
    state: "Haryana",
    industry: "Chemical Manufacturing",
    code: "789",
    lastOnline: "06-09-2026 19:20:04",
    status: "inactive",
  },
];

const pageSizes = [10, 20, 50];

function StatusIcon({ status }: { status: SiteStatus }) {
  if (status === "active") {
    return <Check size={14} strokeWidth={3} />;
  }

  if (status === "attention") {
    return <AlertCircle size={14} strokeWidth={3} />;
  }

  return <X size={14} strokeWidth={3} />;
}

export default function SiteStatusTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortDescending, setSortDescending] = useState(true);

  const filteredSites = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchingSites = normalizedQuery
      ? sites.filter((site) =>
          Object.values(site).some((value) =>
            String(value).toLowerCase().includes(normalizedQuery)
          )
        )
      : sites;

    return [...matchingSites].sort((first, second) =>
      sortDescending
        ? second.lastOnline.localeCompare(first.lastOnline)
        : first.lastOnline.localeCompare(second.lastOnline)
    );
  }, [query, sortDescending]);

  const totalPages = Math.max(1, Math.ceil(filteredSites.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const firstRow = (currentPage - 1) * pageSize;
  const visibleSites = filteredSites.slice(firstRow, firstRow + pageSize);

  const updateQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const updatePageSize = (value: number) => {
    setPageSize(value);
    setPage(1);
  };

  return (
    <section className="site-status-table">
      <div className="site-status-heading">
        <div className="site-status-title">
          <h1>Site Status</h1>
          <span>Next update in 58 secs</span>
        </div>

        <label className="site-status-search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Search..."
            aria-label="Search sites"
          />
          {query && (
            <button
              type="button"
              onClick={() => updateQuery("")}
              aria-label="Clear search"
            >
              <CircleX size={16} />
            </button>
          )}
        </label>
      </div>

      <div className="site-status-table-scroll">
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Site Name</th>
              <th>City</th>
              <th>State</th>
              <th>Industry Category</th>
              <th>Industry Code</th>
              <th>
                <button
                  className="table-sort"
                  type="button"
                  onClick={() => setSortDescending((value) => !value)}
                >
                  Last Online
                  <ChevronDown
                    size={16}
                    className={sortDescending ? "sort-descending" : ""}
                  />
                </button>
              </th>
              <th>Actions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleSites.map((site, index) => (
              <tr key={site.id}>
                <td>{firstRow + index + 1}</td>
                <td className="site-name-cell">{site.name}</td>
                <td>{site.city}</td>
                <td>{site.state}</td>
                <td>{site.industry}</td>
                <td>{site.code}</td>
                <td>{site.lastOnline}</td>
                <td>
                  <button
                    className="site-action-button"
                    type="button"
                    aria-label={`Open ${site.name}`}
                  >
                    <Monitor size={19} />
                  </button>
                </td>
                <td>
                  <span
                    className={`site-status-badge ${site.status}`}
                    aria-label={site.status}
                  >
                    <StatusIcon status={site.status} />
                  </span>
                </td>
              </tr>
            ))}
            {!visibleSites.length && (
              <tr>
                <td className="empty-table-message" colSpan={9}>
                  No sites match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="site-status-pagination">
        <span className="pagination-summary">
          Showing {filteredSites.length ? firstRow + 1 : 0} - {Math.min(firstRow + pageSize, filteredSites.length)} of {filteredSites.length} records
        </span>

        <div className="pagination-controls" aria-label="Table pagination">
          <button
            type="button"
            className="pagination-arrow"
            disabled={currentPage === 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                className={pageNumber === currentPage ? "active" : ""}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            type="button"
            className="pagination-arrow"
            disabled={currentPage === totalPages}
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>

          <label className="page-size-select">
            <select
              value={pageSize}
              onChange={(event) => updatePageSize(Number(event.target.value))}
              aria-label="Rows per page"
            >
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size} / page
                </option>
              ))}
            </select>
            <ChevronDown size={16} aria-hidden="true" />
          </label>
        </div>
      </div>
    </section>
  );
}