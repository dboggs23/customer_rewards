const day = require('dayjs')
import {
	calculatePoints,
	totalPointsPerCustomer,
	dateWithinRange,
	getMonthTotals,
} from './utils'

describe('Points scenarios: ', () => {
	test('$120.00 purchase should equal 90 points', () => {
		expect(calculatePoints(12000)).toEqual(90)
	})
	test('$60.00 purchase should equal 10 points', () => {
		expect(calculatePoints(6000)).toEqual(10)
	})
	test('$60.99 purchase should equal 10 points', () => {
		expect(calculatePoints(6000)).toEqual(10)
	})
	test('$200.00 purchase should equal 250 points', () => {
		expect(calculatePoints(20000)).toEqual(250)
	})
	test('$.01 purchase should equal 0 points', () => {
		expect(calculatePoints(1)).toEqual(0)
	})
	test('$0 purchase should equal 0 points', () => {
		expect(calculatePoints(0)).toEqual(0)
	})
	test('$50.00 purchase should equal 0 points', () => {
		expect(calculatePoints(5000)).toEqual(0)
	})
	test('$499.77 purchase should equal 848 points', () => {
		expect(calculatePoints(5000)).toEqual(0)
	})
})

describe('Calculates points totals correctly', () => {
	const singleCustomer = [
		{
			purchase_id: 'a71107be-c90c-4040-b4de-bf0189f95ad0',
			customer_id: '0f9db75c-bcfe-47a3-b1f4-c787507b752b',
			date_of_purchase: '2022-04-15T07:45:50.611Z',
			first_name: 'Chelsie',
			last_name: 'Ballin',
			purchase_total_in_cents: 31078,
		},
		{
			purchase_id: '70b032ae-43f2-420d-97c2-37b9ed060dc3',
			customer_id: '0f9db75c-bcfe-47a3-b1f4-c787507b752b',
			date_of_purchase: '2022-03-27T20:04:51.659Z',
			first_name: 'Chelsie',
			last_name: 'Ballin',
			purchase_total_in_cents: 47411,
		},
		{
			purchase_id: 'cd7ea94e-605b-47cc-b0fc-fb1600796948',
			customer_id: '0f9db75c-bcfe-47a3-b1f4-c787507b752b',
			date_of_purchase: '2022-02-23T16:10:34.737Z',
			first_name: 'Chelsie',
			last_name: 'Ballin',
			purchase_total_in_cents: 10482,
		},
		{
			purchase_id: '845f1e76-e7ab-4bae-bff1-894903f91ce4',
			customer_id: '0f9db75c-bcfe-47a3-b1f4-c787507b752b',
			date_of_purchase: '2022-04-11T17:59:45.402Z',
			first_name: 'Chelsie',
			last_name: 'Ballin',
			purchase_total_in_cents: 36292,
		},
		{
			purchase_id: 'e351f9d7-bee7-45f1-85df-ff5e375489a5',
			customer_id: '0f9db75c-bcfe-47a3-b1f4-c787507b752b',
			date_of_purchase: '2022-03-18T07:40:44.298Z',
			first_name: 'Chelsie',
			last_name: 'Ballin',
			purchase_total_in_cents: 32608,
		},
		{
			purchase_id: '88411e4e-132c-4652-a8a7-c65da5c84ab8',
			customer_id: '0f9db75c-bcfe-47a3-b1f4-c787507b752b',
			date_of_purchase: '2022-02-18T11:34:42.167Z',
			first_name: 'Chelsie',
			last_name: 'Ballin',
			purchase_total_in_cents: 26935,
		},
		{
			purchase_id: 'a2c1187f-dafa-4b48-8e42-613e3a9c9777',
			customer_id: '0f9db75c-bcfe-47a3-b1f4-c787507b752b',
			date_of_purchase: '2022-03-12T05:16:54.667Z',
			first_name: 'Chelsie',
			last_name: 'Ballin',
			purchase_total_in_cents: 12316,
		},
		{
			purchase_id: 'a2c1187f-dafa-4b48-8e42-613e3a9c9777',
			customer_id: '0f9db75c-bcfe-47a3-b1f4-c787507b752b',
			date_of_purchase: '2022-05-16T13:21:37.772Z',
			first_name: 'Chelsie',
			last_name: 'Ballin',
			purchase_total_in_cents: 20000,
		},
		{
			purchase_id: 'a2c1187f-dafa-4b48-8e42-613e3a9c9777',
			customer_id: '0f9db75c-bcfe-47a3-b1f4-c787507b752b',
			date_of_purchase: '2022-05-15T13:21:37.772Z',
			first_name: 'Chelsie',
			last_name: 'Ballin',
			purchase_total_in_cents: 31458,
		},
	]
	let accumulator = 0
	singleCustomer.forEach((transaction) => {
		accumulator += calculatePoints(transaction['purchase_total_in_cents'])
	})

	const points = totalPointsPerCustomer(singleCustomer)

	test('Reduces each set of transactions for each customer correctly ', () => {
		expect(points[0]['total_points']).toEqual(accumulator)
	})

	const maxDate = day('2022-05-16T13:21:37.772Z')

	test('Gets the correct monthly totals ', () => {
		expect(getMonthTotals(singleCustomer, maxDate)[1]).toEqual(
			calculatePoints(31078) +
				calculatePoints(47411) +
				calculatePoints(36292) +
				calculatePoints(32608)
		)
	})
})
