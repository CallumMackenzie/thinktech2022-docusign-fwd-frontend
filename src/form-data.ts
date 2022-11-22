import axios from "axios";

export interface FormURL {
	nurse: string,
	vaccinated: string
};

export const fetchFormLink = async (passphrase: string,
	callback: (result: FormURL | number) => void) => {
	let res = await axios.post("https://eslsmijhge.execute-api.us-east-2.amazonaws.com/proto/embedded",
		{
			token: passphrase
		}).catch(e => {
			if (e.response?.status != 200)
				callback(e.response?.status);
			else
				callback(e.response);
		});
	console.log(res);
};

// export enum NonEmployeeOrContractType {
// 	Physician = "contractPhysician",
// 	Volunteer = "volunteer",
// 	Student = "student",
// 	Other = "other"
// };

// export enum EmployeeOrg {
// 	VCH = "vch?",
// 	PHSA = "phsa?",
// 	PHC = "phc?",
// 	FHA = "fha?"
// };

// export enum VaccineSite {
// 	LeftDeltoid = "leftDeltoid",
// 	RightDeltoid = "rightDeltoid"
// };

// export class VaccinationData {
// 	// Recipient properties
// 	firstName: string | undefined;
// 	lastName: string | undefined;
// 	email: string | undefined;
// 	birthDate: string | undefined;
// 	PHN: string | undefined;
// 	dateSigned: string | undefined;
// 	residentialAddress: string | undefined;
// 	phoneNumber: string | undefined;

// 	necsType: NonEmployeeOrContractType | undefined; // !TODO
// 	necsOther: string | undefined;
// 	necsOrg: string | undefined;

// 	firstFluVaccine: boolean | undefined; // !TODO
// 	seriousIllness: boolean | undefined; // !TODO
// 	prevVaccineReaction: boolean | undefined; // !TODO
// 	employeeOrg: EmployeeOrg[] = []; // !TODO

// 	// Nurse properties
// 	clinicLocation: string | undefined;
// 	lotNumber: string | undefined;
// 	nurseFirstName: string | undefined;
// 	nurseLastName: string | undefined;
// 	vaccineSite: VaccineSite | undefined; // !TODO
// }