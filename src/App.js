import React, { useState } from 'react';
import './App.css';
import contactsSeed from './contacts.json';
// import render from '@testing-library/react';
const firstContacts = contactsSeed.slice(0, 5);

function App() {
	const [ contacts, setContacts ] = useState(firstContacts);

	//Iteration 2 | Add New Random Contacts
	const randomContact = () => {
		//1.1 Make a contactSeed copy
		const contactCopy = [ ...contacts ];
		let randomContact = '';

		// 1.2 Select the random contact from contactSeed array.
		// Compare id of incoming random selection with ids of current contacts.
		do {randomContact = contactsSeed[Math.floor(Math.random() * contactsSeed.length)];
		} while (contacts.some((contact) => contact.id === randomContact.id));

		// 2. Add that random contacts into the 'contacts' array.
		const newRandom = contactCopy.push(randomContact);

		// 3. Setting the state values : replacing contacts value.
		setContacts(contactCopy, newRandom);
	};

	const sortByName = () => {
		//1. Make a contacts copy
		const contactCopy = [ ...contacts ];

		//2. Sort state of contactCopy array alphabetically
		const alphaSortedContacts = contactCopy.sort((a, b) => {
			let ca = a.name.toLowerCase();
			let cb = b.name.toLowerCase();

			if (ca < cb) {
				return -1;
			}

			if (ca > cb) {
				return 1;
			}
			return 0;
		});

		// 3. Setting the state values : replacing contacts value.
		setContacts(alphaSortedContacts);
	};

	const sortByPopularity = () => {
		//1. Make a contacts state array
		const contactCopy = [ ...contacts ];

		//2. Sort state of contactCopy by popularity
		const popSortedContacts = contactCopy.sort((a, b) => {
			return b.popularity - a.popularity;
		});

		// 3. Setting the state values : replacing contacts value.
		setContacts(popSortedContacts);
	};

	const deleteContactHandler = (contactId) => {
		const contactCopy = [...contacts];

		// 1. Look into contact state and compare incoming id with object id in state
		const contactIndex = contacts.findIndex((item) => item.id === contactId);

		console.log(contactIndex)
		
		// 2. Remove the movie 1. mathed the ID of
		contactCopy.splice(contactIndex, 1);

		// 3. setContacts - updating the values in the state 'contacts'
		setContacts(contactCopy);
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>IronContacts</h1>
				<button onClick={randomContact} contacts={contacts}>
					Add Random Contact
				</button>
				<button onClick={sortByName} contactName={contacts.name}>Sort by Name</button>
				<button onClick={sortByPopularity}>Sort by popularity</button>
				<table>
					<tr>
						<th>name</th>
						<th>Pic</th>
						<th>Popularity</th>
					</tr>
					{contacts.map((item) => (
						<tr key={item.id}>
							<td>{item.name}</td>
							<td>
								<img src={item.pictureUrl} alt={item.name} />
							</td>
							<td>{item.popularity.toFixed(2)}</td>
							<td>
								<button onClick={() => deleteContactHandler(item.id)}>Delete Contact</button>
							</td>
						</tr>
					))}
				</table>

				<button onClick={randomContact}>Add Random Contact</button>
			</header>
		</div>
	);
}

export default App;
