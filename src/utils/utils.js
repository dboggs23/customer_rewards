const day = require('dayjs')
const isBetween = require('dayjs/plugin/isBetween')
const minMax = require('dayjs/plugin/minMax')
day.extend(isBetween)
day.extend(minMax)

function calculatePoints(purchaseAmountInCents) {
	if (purchaseAmountInCents <= 5000) return 0
	if (purchaseAmountInCents <= 10000)
		return Math.floor((purchaseAmountInCents - 5000) / 100)
	return Math.floor((purchaseAmountInCents - 10000) / 100) * 2 + 50
}

function groupBy(list, keyGetter) {
	const map = new Map()
	list.forEach((item) => {
		const key = keyGetter(item)
		const collection = map.get(key)
		if (!collection) {
			map.set(key, [item])
		} else {
			collection.push(item)
		}
	})
	return map
}

function groupCustomersById(customers) {
	return groupBy(customers, (customer) => customer['customer_id'])
}

function totalPointsOverThreeMonths(purchases) {
	return purchases.reduce((acc, customer) => {
		const points = calculatePoints(customer['purchase_total_in_cents'])
		return acc + points
	}, 0)
}

function dateWithinRange(
	purchaseDate,
	maxDate,
	endMonth,
	startMonth,
	inclusive
) {
	return day(purchaseDate).isBetween(
		maxDate.subtract(endMonth, 'month'),
		maxDate.subtract(startMonth, 'month'),
		null,
		inclusive
	)
}

function getMonthTotals(customerPurchases, maxDate) {
	const monthTotals = [0, 0, 0]

	for (let purchase of customerPurchases) {
		const purchaseDate = purchase['date_of_purchase']
		if (dateWithinRange(purchaseDate, maxDate, 0, 1, '[]')) {
			monthTotals[2] += calculatePoints(purchase['purchase_total_in_cents'])
		} else if (dateWithinRange(purchaseDate, maxDate, 1, 2, '[]')) {
			monthTotals[1] += calculatePoints(purchase['purchase_total_in_cents'])
		} else if (dateWithinRange(purchaseDate, maxDate, 2, 3, '[]')) {
			monthTotals[0] += calculatePoints(purchase['purchase_total_in_cents'])
		}
	}

	return monthTotals
}

function getMaxDate(customers) {
	const dateArr = customers.map(
		(purchase) => new Date(purchase['date_of_purchase'])
	)
	return day(new Date(Math.max.apply(null, dateArr)))
}

function totalPointsPerCustomer(customers) {
	if (!customers) return []
	const groupedCustomers = groupCustomersById(customers)
	const maxDate = getMaxDate(customers)
	const reducedCustomers = []
	for (const [key, value] of groupedCustomers.entries()) {
		const customer = {}
		const monthTotals = getMonthTotals(value, maxDate)
		customer['customer_id'] = value[0]['customer_id']
		customer['first_name'] = value[0]['first_name']
		customer['last_name'] = value[0]['last_name']
		customer['first_month'] = monthTotals[0]
		customer['second_month'] = monthTotals[1]
		customer['third_month'] = monthTotals[2]
		customer['total_points'] = monthTotals.reduce((a, b) => a + b)

		reducedCustomers.push(customer)
	}
	return reducedCustomers
}

export {
	calculatePoints,
	totalPointsPerCustomer,
	dateWithinRange,
	getMonthTotals,
}
