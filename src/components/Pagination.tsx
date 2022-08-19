import React, { SetStateAction } from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}

export default function Pagination({
  pageCount,
  currentPage,
  setCurrentPage,
}: PaginationProps): JSX.Element {
  return (
    <ReactPaginate
      containerClassName='pagination-container'
      pageClassName='pagination-page'
      activeClassName='pagination-page-active'
      pageLinkClassName='pagination-link'
      activeLinkClassName='pagination-link-active'
      previousClassName='pagination-navigation-button'
      previousLinkClassName='pagination-navigation-button-link'
      nextClassName='pagination-navigation-button'
      nextLinkClassName='pagination-navigation-button-link'
      breakClassName='pagination-break'
      previousLabel={'<'}
      nextLabel={'>'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={(page) => setCurrentPage(page.selected + 1)}
      renderOnZeroPageCount={() => null}
    />
  );
}
