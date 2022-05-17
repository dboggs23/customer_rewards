import React, { useEffect, useState } from 'react'
import { useFetchCustomers } from '../../../utils/useFetchCustomers'
import { totalPointsPerCustomer } from '../../../utils/utils'
import Table from '../react-table/Table'

function TableContainer() {
	const [customers, setCustomers] = useState()
	const { customerTotals, error, isLoading } = useFetchCustomers(
		'data/customers.json'
	)

	useEffect(() => {
		if (customerTotals.length > 0 && !isLoading && !error) {
			const reducedCustomers = totalPointsPerCustomer(customerTotals)
			setCustomers(reducedCustomers)
		}
	}, [isLoading, error, customerTotals])

	const columns = React.useMemo(
		() => [
			{
				Header: 'Points Totals by Customer',
				columns: [
					{
						Header: 'Customer Id',
						accessor: 'customer_id',
					},
					{
						Header: 'First Name',
						accessor: 'first_name',
					},
					{
						Header: 'Last Name',
						accessor: 'last_name',
					},
					{
						Header: 'First Month', //display the actual dates here
						accessor: 'first_month',
					},
					{
						Header: 'Second Month',
						accessor: 'second_month',
					},
					{
						Header: 'Third Month',
						accessor: 'third_month',
					},
					{
						Header: 'Total Points',
						accessor: 'total_points',
					},
				],
			},
		],
		[]
	)

	return (
		<>
			{isLoading && <span>Loading</span>}
			{!isLoading && error && <span>Error in fetching data</span>}
			{!isLoading && !error && customers && (
				<div>
					<Table columns={columns} data={customers} />
				</div>
			)}
		</>
	)
}

export default TableContainer
