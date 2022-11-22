import axios from "axios";

const API_URL = "https://eslsmijhge.execute-api.us-east-2.amazonaws.com/proto/embedded";

export interface FormURL {
	nurse: string,
	vaccinated: string
};

export const fetchVaccineData = async (
	passphrase: string,
	callback: (result: any) => void
) => {
	const res = await axios.post(API_URL, {
		token: passphrase,
		type: "data"
	}).catch(e => {
		if (e.response?.status != 200)
			callback(e.response?.status)
		else callback(e.response)
	});
	if (res !== undefined)
		callback(res);
};

export const fetchFormLink = async (
	passphrase: string,
	callback: (result: any) => void
) => {
	const res = await axios.post(API_URL,
		{
			token: passphrase,
			type: "link"
		}).catch(e => {
			if (e.response?.status != 200)
				callback(e.response?.status);
			else callback(e.response);
		});
	if (res !== undefined)
		callback(res);
};