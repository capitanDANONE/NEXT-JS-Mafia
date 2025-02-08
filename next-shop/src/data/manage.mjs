import fs from 'fs';
import path from 'path';
export function addKeyValueToJSON(Path, key, value) {
	try {
		const jsonString = fs.readFileSync(Path, 'utf8');
		const data = JSON.parse(jsonString);
		data[key] = value;
		fs.writeFileSync(Path, JSON.stringify(data, null, 2));
	} catch (err) {
		console.error('Error updating JSON file:', err);
	}
}
export function deleteKeyFromJSON(Path, key) {
	try {
		const jsonString = fs.readFileSync(Path, 'utf8');
		const data = JSON.parse(jsonString);

		if (key in data) {
			delete data[key];
			fs.writeFileSync(Path, JSON.stringify(data, null, 2));
			console.log(`Key "${key}" deleted successfully.`);
		} else {
			console.log(`Key "${key}" not found in the JSON file.`);
		}
	} catch (err) {
		console.error('Error updating JSON file:', err);
	}
}
export function hasEntries(Path, entry){
	try {
		const jsonString = fs.readFileSync(Path, 'utf8');
		const data = JSON.parse(jsonString);
		return entry in data
	} catch (err) {
		console.error('Error updating JSON file:', err);
	}
}
export function returnDataObjectByKey(Path, key){
	try {
		const jsonString = fs.readFileSync(Path, 'utf8');
		const data = JSON.parse(jsonString);
		return data[key]
	} catch (err) {
		console.error('Error updating JSON file:', err);
	}
}
export function VerifyJWT(Path, username, JWT){
	try {
		if (!username || !JWT){
			return false
		}
		const jsonString = fs.readFileSync(Path, 'utf8');
		const data = JSON.parse(jsonString);
		return data[username].JWT == JWT
	} catch (err) {
		console.error('Error updating JSON file:', err);
	}
}
export function UpdateInfo(Path, key, field){
	console.log('How the fuck0')
	try {
		const jsonString = fs.readFileSync(Path, 'utf8');
		const data = JSON.parse(jsonString);
		const updatedData = { ...data[key], ...field }
		console.log('How the fuck1')
		try {
			const jsonString = fs.readFileSync(Path, 'utf8');
			const data = JSON.parse(jsonString);
	
			if (key in data) {
				delete data[key];
				fs.writeFileSync(Path, JSON.stringify(data, null, 2));
				console.log(`Key "${key}" deleted successfully.`);
			} else {
				console.log(`Key "${key}" not found in the JSON file.`);
			}
		} catch (err) {
			console.error('Error updating JSON file:', err);
		}
		console.log('How the fuck2')
		try {
			const jsonString = fs.readFileSync(Path, 'utf8');
			const data = JSON.parse(jsonString);
			data[key] = updatedData;
			fs.writeFileSync(Path, JSON.stringify(data, null, 2));
		} catch (err) {
			console.error('Error updating JSON file:', err);
		}
		console.log('How the fuck3')
	} catch (err) {
		console.error('Error updating JSON file:', err);
	}
}