import React from 'react';

export default function Pagination(props) {
  const { totalPages } = props;
  const currentPage = Number(props.currentPage);

  const prevPageUrl = currentPage === 2 ? '/songs' : `/songs/page/${currentPage - 1}`;
  const nextPageUrl = `/songs/page/${currentPage + 1}`;

  return (
    <div className="paginationBox">
      <div className="paginationBoxPrev">
        {currentPage !== 1 && (
          <a href={prevPageUrl} className="prevLink">
            Previous page
          </a>
        )}
      </div>
      <div className="paginationBoxPages">
        Page {currentPage} of {totalPages}
      </div>
      <div className="paginationBoxNext">
        {currentPage < totalPages && (
          <a href={nextPageUrl} className="nextLink">
            Next page
          </a>
        )}
      </div>
    </div>
  );
}
