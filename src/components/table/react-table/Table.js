import React, { useEffect } from 'react'
import { useTable, usePagination } from 'react-table'
import styles from './table.module.css'

function Table({ columns, data }) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		pageOptions,
		state: { pageIndex, pageSize },
		gotoPage,
		canPreviousPage,
		nextPage,
		setPageSize,
		canNextPage,
		previousPage,
		pageSizeOptions,
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 1 },
		},
		usePagination
	)

	return (
		<>
			<table {...getTableProps()} className='container'>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row)
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
			<div>
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>
					Previous Page
				</button>
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					Next Page
				</button>
			</div>
		</>
	)
}

export default Table
