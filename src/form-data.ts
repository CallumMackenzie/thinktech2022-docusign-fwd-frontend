import axios from "axios";

export interface FormURL {
	nurse: string,
	vaccinated: string
};

export const fetchFormLink = async (passphrase: string,
	callback: (result: any) => void) => {
	let res = await axios.post("https://eslsmijhge.execute-api.us-east-2.amazonaws.com/proto/embedded",
		{
			token: passphrase
		}).catch(e => {
			if (e.response?.status != 200)
				callback(e.response?.status);
			else
				callback(e.response);
		});
	if (res !== undefined)
		callback(res);
};