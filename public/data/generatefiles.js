const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

function randomDate() {
	const start = new Date()
	const end = new Date()
	end.setMonth(end.getMonth() - 3)
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	)
}

function randomNum(highRange) {
	return Math.floor(Math.random() * highRange)
}

function getNames() {
	return fs.promises.readFile('./names.json', { encoding: 'utf8' })
}

function randomDollarVal(highRange) {
	return Math.floor(Math.random() * highRange)
}

async function createNewMockJSON() {
	const names = await getNames()
	const parsedNames = JSON.parse(names)

	const customers = []
	let i = 0
	while (i < 3000) {
		const num = randomNum(300)
		const customer = {}
		customer['purchase_id'] = uuidv4()
		customer['customer_id'] = parsedNames[num]['customer_id']
		customer['date_of_purchase'] = randomDate()
		customer['first_name'] = parsedNames[num]['first_name']
		customer['last_name'] = parsedNames[num]['last_name']
		customer['purchase_total_in_cents'] = randomDollarVal(50000)
		customers.push(customer)

		i++
	}
	const fileName = 'customers'
	fs.writeFile(
		`./${fileName}.json`,
		JSON.stringify(customers),
		{ flag: 'w' },
		(err) => {
			if (err) throw err
			console.log('file created')
		}
	)
}

createNewMockJSON()

/**
 * {
 *      id
 *      date of purchase
 *      last name
 *      first name
 *      purchase total
 * }
 *
 */
