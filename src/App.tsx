import React from 'react';
import './App.css';
import { Blocks } from 'react-loader-spinner';
import { fetchFormLink, fetchVaccineData, FormURL } from './form-data';

function App() {
	return (<div className="App">
		<Form />
	</div>);
}

interface FormProps { }
interface FormState {
	value: string,
	requesting: boolean,
	error: string,
	vaccinationData: any
}

interface LoaderProps {
	requesting: boolean
}

const LoadingIndicator = (props: LoaderProps) => {
	return (props.requesting &&
		<div style={{
			width: "100%",
			height: "100",
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
		}}>
			<Blocks />
		</div>) || <></>;
}

class Form extends React.Component<FormProps, FormState> {
	constructor(props: FormProps) {
		super(props);
		this.state = {
			value: "",
			requesting: false,
			error: "",
			vaccinationData: undefined
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.viewData = this.viewData.bind(this);
	}

	handleChange(event: any) {
		this.setState({ value: event.target.value });
	}

	private errorResult(result: any): boolean {
		if (result == 401) {
			this.setState({
				error: "Incorrect passphrase",
				requesting: false
			});
			return true;
		} else if (result == 502 || result == 500) {
			this.setState({
				error: "Request error",
				requesting: false
			});
			return true;
		}
		return false;
	}

	viewData(event: any) {
		this.setState({ requesting: true, error: "" });
		event.preventDefault();
		fetchVaccineData(this.state.value,
			(result: any) => {
				console.log(result);
				if (this.errorResult(result)) return;
				if (result.data.items !== undefined)
					this.setState({
						requesting: false,
						error: "Vaccination data fetched",
						vaccinationData: result.data.items
					});
				else this.setState({
					requesting: false,
					error: "Unknown error"
				});
			});
	}

	handleSubmit(event: any) {
		event.preventDefault();
		this.setState({ requesting: true, error: "" });
		fetchFormLink(this.state.value,
			(result: any) => {
				console.log(result);
				if (this.errorResult(result)) return;
				if (result.data.url !== undefined) {
					this.setState({ error: "Redirecting ... " });
					console.log("URL: " + result.data.url);
					window.location.href = result.data.url;
				} else this.setState({
					error: "Unknown error",
					requesting: false
				});
			});
	}

	render(): React.ReactNode {
		return (<form style={{
			justifyContent: "center",
			alignItems: "center",
			padding: "5%"
		}}
			onSubmit={this.handleSubmit}>
			<p>Passphrase:</p>
			<br />
			<input type="text"
				disabled={this.state.requesting}
				value={this.state.value}
				name="passphrase"
				onChange={this.handleChange} />
			<br />
			<button type="button"
				name="Sign Vaccination Form"
				disabled={this.state.requesting} />
			<br />
			<button type="button"
				name="View Data"
				onClick={this.viewData}
				disabled={this.state.requesting}>View Data</button>
			<p>{this.state.error}</p>
			<ul>
				{(this.state.vaccinationData === undefined ? [] :
					this.state.vaccinationData).map((item: any) =>
					(<p>{item.firstName + " " + item.lastName
						+ " vaccinated on "
						+ item.dateSigned}</p>))}
			</ul>
			<br />
			<LoadingIndicator requesting={this.state.requesting} />
		</form>
		);

	}
}

export default App;
