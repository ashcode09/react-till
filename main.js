// Want to pass the Menu's state.menu to parent Cafe as a property, if possible.
// For now, menu is inside the till, but will transfer eventually.
// Am now keeping the menu in Cafe and passing to Menu. Will amend soon.





var Cafe = React.createClass({
	getDefaultProps: function() {
		return {
			menu: {
				Bagel: 3.50,
				Muffin: 2.90,
				Tea: 1.80,
				Coffee: 3.20,
				Sandwich: 3.50
			}
		}
	},
	render: function() {
		

		console.log('Cafe props:')
		console.log(this.props)
		console.log('Cafe state:')
		console.log(this.state)


		return (
			<div
				className="cafe-container">
				<Menu
					cafeMenu={this.props.menu}>
				</Menu>
				<Till
					cafeMenu={this.props.menu}>
				</Till>
			</div>
		)
	}
});








var Menu = React.createClass({
	eachMenuItem: function(menuItem, i) {
		return (
			<li
				className="no-list-style"
				key={i}>
				{menuItem} = £ {this.props.cafeMenu[menuItem]}
			</li>
		)
	},
	render: function() {
		var menu = this.props.cafeMenu;
		return (
			<div
				className="menu-container">
				Menu:
				<ul>
					{Object.keys(menu).map(this.eachMenuItem)}
				</ul>
			</div>
		)
	}
});










var Till = React.createClass({
	getInitialState: function() {
		return {
			orderItems: [],
			orderTotal: 0,
			customerPayment: '',
			changeDueToCustomer: 0
		}
	},
	eachMenuItem: function(menuItem, i) {
		return (
			<option
				key={i}>
				{menuItem}
			</option>
		)
	},
	nextId: function() {
		this.uniqueId = this.uniqueId || 0;
		return this.uniqueId++;
	},
	takeCustomerPayment: function(element) {
		if (!((this.state.customerPayment.indexOf('.') !== -1) && (this.state.customerPayment.length - 1) - this.state.customerPayment.indexOf('.') >= 2)) {
			this.setState({customerPayment: this.state.customerPayment + element.target.value});
		}
	},
	deleteLastDigit: function() {
		newCustPayment = this.state.customerPayment.substr(0, this.state.customerPayment.length - 1)
		this.setState({customerPayment: newCustPayment});
	},
	calcChangeDueToCustomer: function() {
		if (this.state.customerPayment - this.state.orderTotal >= 0) {
			this.setState({changeDueToCustomer: this.state.customerPayment - this.state.orderTotal});
		};
	},
	addToOrder: function() {
		var allItemsOnOrder = this.state.orderItems;
		var itemToAdd = ReactDOM.findDOMNode(this.refs.selectedMenuItem).value;
		var itemArray = {item: itemToAdd, id: this.nextId()};
		allItemsOnOrder.push(itemArray);
		this.setState({orderItems: allItemsOnOrder});
		this.setState({orderTotal: this.state.orderTotal + this.props.cafeMenu[itemToAdd]});
	},
	render: function() {


		console.log('Till props:')
		console.log(this.props)
		console.log('Till state:')
		console.log(this.state)


		var menu = this.props.cafeMenu;
		return (
			<div
				className="till-container">
				<div className="calculator">
					<p>Choose an item to add to order:</p>
					<select
						ref="selectedMenuItem">
						{Object.keys(menu).map(this.eachMenuItem)}
					</select>
					<button
						className="allCalcBtns otherBtns"
						onClick={this.addToOrder}>
						Add to Order
					</button>

					<div>
						<div>
							<input className="allCalcBtns numberBtns" type="button" onClick={this.takeCustomerPayment} value="1" />
							<input className="allCalcBtns numberBtns" type="button" onClick={this.takeCustomerPayment} value="2" />
							<input className="allCalcBtns numberBtns" type="button" onClick={this.takeCustomerPayment} value="3" />
						</div>
						<div>
							<input className="allCalcBtns numberBtns" type="button" onClick={this.takeCustomerPayment} value="4" />
							<input className="allCalcBtns numberBtns" type="button" onClick={this.takeCustomerPayment} value="5" />
							<input className="allCalcBtns numberBtns" type="button" onClick={this.takeCustomerPayment} value="6" />
						</div>
						<div>
							<input className="allCalcBtns numberBtns" type="button" onClick={this.takeCustomerPayment} value="7" />
							<input className="allCalcBtns numberBtns" type="button" onClick={this.takeCustomerPayment} value="8" />
							<input className="allCalcBtns numberBtns" type="button" onClick={this.takeCustomerPayment} value="9" />
						</div>
						<div>
							<input className="allCalcBtns numberBtns" type="button" onClick={this.takeCustomerPayment} value="0" />
							<input className="allCalcBtns numberBtns" type="button" onClick={this.takeCustomerPayment} value="." />
						</div>
						<input className="allCalcBtns otherBtns" type="button" onClick={this.deleteLastDigit} value="Delete" />
						<input className="allCalcBtns otherBtns" type="button" onClick={this.calcChangeDueToCustomer} value="Calculate change due" />
					</div>
				</div>
				<Receipt
					cafeMenu={this.props.cafeMenu}
					itemsOrdered={this.state.orderItems}
					orderTotal={this.state.orderTotal}
					customerPayment={this.state.customerPayment}
					changeDueToCustomer={this.state.changeDueToCustomer}>
				</Receipt>
			</div>
		)
	}
});




var Receipt = React.createClass({
	shouldComponentUpdate: function() {
		return true
	},
	eachOrderItem: function(orderItem, i) {
		return (
			<li
				className="no-list-style"
				key={orderItem.id}
				id={i}>
				<div className="receipt-item">
					{orderItem.item}
				</div>
				<div className="receipt-item-price">
					£{this.props.cafeMenu[orderItem.item]}
				</div>
			</li>
		)
	},
	render: function() {


		console.log('Receipt props:')
		console.log(this.props)
		console.log('Receipt state:')
		console.log(this.state)


		var itemsOrdered = this.props.itemsOrdered;
		return (
			<div
				className="receipt-container">
				<p className="">Thanks for eating our food, fatty!</p>
				<ul
					className="receipt-items-ordered">
					{itemsOrdered.map(this.eachOrderItem)}
				</ul>
				<div>
					£{this.props.orderTotal}
				</div>
				<div>
					£{this.props.customerPayment}
				</div>
				<div>
					£{this.props.changeDueToCustomer}
				</div>
			</div>
		)
	}
});

ReactDOM.render(
  <Cafe />,
  document.getElementById('react-container')
);