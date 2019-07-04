import React from "react";
import {
	ListGroup,
	ListGroupItem,
	Row,
	Col,
	Form,
	FormInput,
	FormGroup,
	FormCheckbox,
	FormSelect,
	Button,
	FormTextarea
} from "shards-react";
import lodash from "lodash";

const InitialState = {};

class FormComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = InitialState;
		console.log("this.props", this.props);
	}

	onSubmit = () => {
		console.log("KJLJKLKJK", this.state);
		this.props.onSubmit(this.state);
		this.setState(InitialState);
	};

	toggleState = (key, value) => {
		console.log("ITEM", key, value);
		this.setState(prevState => ({
			[lodash.snakeCase(key)]: !prevState[lodash.snakeCase(value)]
		}));
	};

	handleChange = (key, value) => {
		console.log("KEY", key, value);
		this.setState({
			[key]: value
		});
	};

	generateElement = element => {
		const elementLabel = lodash.snakeCase(element.label);
		switch (element.type) {
			case "text-area":
				return (
					<FormTextarea
						id={`fe${element.label}`}
						rows={`${element.rows}` || "3"}
						value={
							this.props.details[element.dbName || elementLabel] ||
							this.state[elementLabel] ||
							this.state[element.dbName] ||
							element.value ||
							""
						}
						onChange={e =>
							this.handleChange(element.dbName || elementLabel, e.target.value)
						}
					/>
				);
			case "dropdown":
				return (
					<FormSelect
						id={`fe${element.label}`}
						onChange={e =>
							this.handleChange(element.dbName || elementLabel, e.target.value)
						}
					>
						<option
							key={element.dbName || elementLabel || ""}
							value={this.props.details[element.dbName || elementLabel] || ""}
						>
							{this.props.details[element.dbName || elementLabel] ||
								"Choose one"}
						</option>
						{element.values &&
							element.values.map((val, idx) => (
								<option key={val.key} value={val.value}>
									{val.value}
								</option>
							))}
					</FormSelect>
				);
			case "checkbox":
				return <FormCheckbox toggle={true} small={true}></FormCheckbox>;
			default:
				return (
					<FormInput
						id={`fe${element.label}`}
						type={element.type || "text"}
						placeholder={element.placeholder || element.label}
						value={
							this.props.details[element.dbName || elementLabel] ||
							this.state[elementLabel] ||
							this.state[element.dbName] ||
							element.value ||
							""
						}
						onChange={e =>
							this.handleChange(element.dbName || elementLabel, e.target.value)
						}
						disabled={element.disabled}
					/>
				);
		}
	};

	render() {
		return (
			<ListGroup flush>
				<ListGroupItem className="p-3">
					<Row>
						<Col>
							<Form>
								<Row form className="form-group">
									{this.props.list.map((item, index) => {
										if (item.hidden) {
											return null;
										}
										return !item.group ? (
											<Col
												md={item.division || 12}
												className="px-2"
												key={index}
											>
												<label
													htmlFor={`fe${item.label}`}
													style={{ fontSize: "14px", marginTop: "10px" }}
												>
													<b>
														{item.label}
														<span hidden={!item.required}> *</span>
													</b>
												</label>
												<span>{this.generateElement(item)}</span>
											</Col>
										) : (
											<>
												<Col md={item.division || 12} key={index}>
													<label>{item.label}</label>
													<span onChange={e => this.toggleState(item.label)}>
														{this.generateElement(item)}
													</span>
												</Col>
												{this.state[item.label] &&
													item.values.map((value, ind) => (
														<Col md={value.division || 12} key={ind}>
															<label htmlFor={`fe${value.label}`}>
																{value.label}
															</label>
															{this.generateElement(value)}
														</Col>
													))}
											</>
										);
									})}
								</Row>
								<FormGroup>
									<FormCheckbox>
										{/* eslint-disable-next-line */}I agree with your{" "}
										<a href="#">Privacy Policy</a>.
									</FormCheckbox>
								</FormGroup>
								<Button type="button" onClick={this.onSubmit}>
									Update
								</Button>
							</Form>
						</Col>
					</Row>
				</ListGroupItem>
			</ListGroup>
		);
	}
}

export default FormComponent;
