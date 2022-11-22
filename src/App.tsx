import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Blocks } from 'react-loader-spinner';
import { VaccinationData } from './vaccination-data';
import { JsxElement } from 'typescript';
import { fetchVaccinationData } from './vaccination-data';

function App() {
	return (<div className="App">
		<Form />
	</div>);
}

interface FormProps { }
interface FormState {
	value: string,
	requesting: boolean
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
			requesting: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event: any) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event: any) {
		event.preventDefault();
		this.setState({ requesting: true })
		fetchVaccinationData(this.state.value,
			(result: VaccinationData[]) => {
				this.setState({ requesting: false });
			});
	}

	render(): React.ReactNode {
		return (<form style={{
			justifyContent: "center",
			alignItems: "center",
			padding: "5%"
		}}
			onSubmit={this.handleSubmit}>
			<text>Passphrase:</text>
			<br/>
			<input type="text"
				disabled={this.state.requesting}
				value={this.state.value}
				name="passphrase"
				onChange={this.handleChange} />
			<input type="submit"
				name="submit"
				disabled={this.state.requesting} />
			<LoadingIndicator requesting={this.state.requesting} />
		</form>
		);

	}
}

export default App;
