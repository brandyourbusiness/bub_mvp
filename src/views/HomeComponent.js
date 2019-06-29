import React, { Component } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	CardFooter,
	Button,
	Badge,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	FormInput,
	InputGroup,
	InputGroupText,
	InputGroupAddon
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { RUN_JOBS } from "../apollo/queries";
import { CREATE_COUPON_CODE } from "../apollo/mutations";

const BRANDS_LIST = require("../data/brands_list.json");

class HomeComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			consumer: '',
			authUser: {
				id: "123",
				number: "8078xxxxxx"
			},
			brandsList: BRANDS_LIST
		};
	}

	toggleModal = brand => {
		this.setState({
			open: !this.state.open,
			brandTitle: brand && brand.title,
			selectedBrand: brand
		});
	};

	generateCoupon = () => {
		this.props.client.mutate({
			mutation: CREATE_COUPON_CODE,
			variables: {
				input: {
					referrer: this.state.authUser.number,
					referrer_id: this.state.authUser.id,
					brand_id: this.state.selectedBrand.id || '1',
					consumer: this.state.consumer,
					expiry_date: new Date()
				}
			}
		})
		.then(({data: { createCoupon }}) => {
			let bodyTemplate = `Congratulations! Get BUB discount at ${this.state.brandTitle} by using code ${createCoupon.coupon_code}. This coupon is applicable only when you use BUB app during the payment time.`
			this.props.client.query({
				query: RUN_JOBS,
				variables: {
					jobName: ["send_sms"],
					jobOptions: {
						body: bodyTemplate,
						to: "+91" + this.state.consumer
					}
				}
			})
			.then((data) => {
				console.log("DATA", data)
				this.setState({
					valid: false,
					open: !this.state.open
				})
			})
			.catch(e => {
				console.log(e)
			})
		})
	};

	handleModalInputChange = e => {
		let number = e.target.value;
		if (number.length === 10) {
			this.setState({
				valid: true,
				consumer: number
			});
		} else {
			this.setState({ valid: false });
		}
	};

	renderModal = () => (
		<>
			<Modal
				size="md"
				centered="true"
				open={this.state.open}
				toggle={this.toggleModal}
			>
				<ModalHeader toggle={this.toggleModal}>
					{this.state.brandTitle}
				</ModalHeader>
				<ModalBody>
					<InputGroup>
						<InputGroupAddon type="prepend">
							<InputGroupText> +91 </InputGroupText>
						</InputGroupAddon>
						<FormInput
							valid={this.state.valid}
							type="number"
							placeholder="Enter number"
							className="mb=2"
							onChange={this.handleModalInputChange}
						/>
					</InputGroup>
				</ModalBody>
				<ModalFooter>
					<Button size="md" theme="info" onClick={this.generateCoupon}>
						Submit
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);

	render = () => (
		<Container fluid className="main-content-container px-4">
			{/* Page Header */}
			<Row noGutters className="page-header py-4">
				<PageTitle
					sm="4"
					title="Brands List"
					subtitle="Bengaluru"
					className="text-sm-left"
				/>
			</Row>

			<Row>
				{this.state.brandsList.map((brand, idx) => (
					<Col lg="4" md="6" key={idx} className="mb-5">
						<Card small className="card-post card-post--brands h-100">
							<div
								className="card-post__image"
								style={{ backgroundImage: `url('${brand.backgroundImage}')` }}
							>
								<Badge
									pill
									className={`card-post__category bg-${brand.categoryTheme}`}
									style={{
										position: "absolute",
										right: "3%",
										top: "7%",
										padding: ".90em",
										fontSize: "13px"
									}}
								>
									{brand.sub_category || brand.category}
								</Badge>
							</div>
							<CardBody className="pt-3 pb-1">
								<div className="h6 card-title">
									{brand.title}
									<div
										className="float-right"
										style={{ fontWeight: "400", fontSize: "14px" }}
									>
										<a href="#" data-toggle="tooltip" title="View location">
											{brand.area}
										</a>
									</div>
								</div>
							</CardBody>
							<CardFooter className="border-top d-flex py-2">
								<div className="card-post__author d-flex">
									<div className="d-flex flex-column justify-content-center">
										<span className="card-post__author-name">
											Discount: {brand.discount}%
										</span>
									</div>
								</div>
								<div className="my-auto ml-auto">
									<Button
										size="md"
										theme="white"
										onClick={e => this.toggleModal(brand)}
									>
										<i className="fa fa-share-alt mr-1" /> Refer
									</Button>
									{this.renderModal()}
								</div>
							</CardFooter>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default HomeComponent;
