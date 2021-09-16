import React from 'react';
import Link from 'next/link';
function NewsPage() {
  return (
    <React.Fragment>
      <h1>The News Page</h1>
      <ul>
        <li>
          <Link href="/news/important-news" className="nav-link">
            Important News
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default NewsPage;
