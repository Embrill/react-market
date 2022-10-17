import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ onChangePage, pageCurrent }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			previousLabel="<"
			nextLabel=">"
			onPageChange={(event) => onChangePage(event.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={pageCurrent - 1} // forcePage - текущая страница
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;
