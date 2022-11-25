import React from "react";

import "./Tabs.css";

const Tabs = ({ repos, user, repoCount }) => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <p className="nav-link mb-0 active">Repositories {repoCount}</p>
    </li>
  </ul>
);

export default Tabs;
