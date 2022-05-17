import React, { useState, useEffect } from 'react'

export function useFetchCustomers(url) {
	const [customerTotals, setCustomerTotals] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		const fetchData = async () => {
			try {
				fetch(url)
					.then((res) => res.json())
					.then((data) => setCustomerTotals(data))
				setIsLoading(false)
			} catch (error) {
				setError(error)
				setIsLoading(false)
			}
		}

		fetchData()
	}, [url])
	return { customerTotals, error, isLoading }
}
