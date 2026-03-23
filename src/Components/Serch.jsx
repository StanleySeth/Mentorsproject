import React, { useState } from "react";

const SearchWithFilters = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Filtering logic
  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || item.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ padding: "1rem" }}>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "1rem" }}
      />

      {/* Filter Dropdown */}
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="tech">Tech</option>
        <option value="design">Design</option>
        <option value="business">Business</option>
      </select>

      {/* Results */}
      <ul style={{ marginTop: "1rem" }}>
        {filteredData.map((item, index) => (
          <li key={index}>{item.name} - {item.category}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchWithFilters;