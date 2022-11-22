import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Blocks } from 'react-loader-spinner';
import { fetchFormLink, FormURL } from './form-data';
import { JsxElement } from 'typescript';

function App() {
	return (<div className="App">
		<Form />
	</div>);
}

interface FormProps { }
interface FormState {
	value: string,
	requesting: boolean,
	error: string
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
			error: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event: any) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event: any) {
		event.preventDefault();
		this.setState({ requesting: true, error: "" })
		fetchFormLink(this.state.value,
			(result: any) => {
				console.log(result);
				console.log("no longer requesting");
				if (result == 401) {
					this.setState({
						error: "Incorrect passphrase",
						requesting: false
					})
				} else if (result == 502 || result == 500) {
					this.setState({
						error: "Request error",
						requesting: false
					})
				} else {
					this.setState({ error: "Redirecting ... " })
					console.log("URL: " + result.data.url)
					window.location.href = result.data.url;
				}
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
			<input type="submit"
				name="submit"
				disabled={this.state.requesting} />
			<br />
			<p>{this.state.error}</p>
			<br />
			<LoadingIndicator requesting={this.state.requesting} />
		</form>
		);

	}
}

export default App;
