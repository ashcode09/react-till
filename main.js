var Menu = React.createClass({
	eachMenuItem: function(menuItem, i) {
		return (
			<li
				key={i}>
				{menuItem} = £ {this.props.cafeMenu[menuItem]}
			</li>
		)
	},
	render: function() {
		var menu = this.props.cafeMenu;
		return (
			<div>
				Menu:
				<ul>
					{Object.keys(menu).map(this.eachMenuItem)}
				</ul>
			</div>
		)
	}
});





// Want to pass the Menu's state.menu to parent Cafe as a property, if possible.
// For now, menu is inside the till, but will transfer eventually.
// Am now keeping the menu in Cafe and passing to Menu. Will amend soon.





var Cafe = React.createClass({
	getDefaultProps: function() {
		return {
			menu: {
				Bagel: 10,
				Muffin: 10,
				Tea: 5,
				Coffee: 6,
				Sandwich: 15
			}
		}
	},
	render: function() {
		

		console.log('Cafe props:')
		console.log(this.props)
		console.log('Cafe state:')
		console.log(this.state)


		return (
			<div>
				Cafe:
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




var Till = React.createClass({
	getInitialState: function() {
		return {
			orderItems: [],
			orderPrices: 0
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
	addToOrder: function() {
		var itemToAdd = ReactDOM.findDOMNode(this.refs.selectedMenuItem).value;
		this.state.orderItems.push(itemToAdd);
		this.state.orderPrices = this.state.orderPrices + this.props.cafeMenu[itemToAdd];
		console.log(this.state.orderItems)
		console.log(this.state.orderPrices)
	},
	render: function() {


		console.log('Till props:')
		console.log(this.props)
		console.log('Till state:')
		console.log(this.state)


		var menu = this.props.cafeMenu;
		return (
			<div>
				Till:
				<select
					ref="selectedMenuItem">
					{Object.keys(menu).map(this.eachMenuItem)}
				</select>
				<select>
					<option>1</option>
				</select>
				<button
					onClick={this.addToOrder}>
					Add to Order
				</button>
				<Receipt
					cafeMenu={this.props.cafeMenu}
					itemsOrdered={this.state.orderItems}>
				</Receipt>
			</div>
		)
	}
});




var Receipt = React.createClass({
	render: function() {


		console.log('Receipt props:')
		console.log(this.props)
		console.log('Receipt state:')
		console.log(this.state)


		return (
			<div>
				Receipt:
				{this.props.children}
			</div>
		)
	}
});

ReactDOM.render(
  <Cafe />,
  document.getElementById('react-container')
);