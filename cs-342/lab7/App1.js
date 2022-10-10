class App extends React.Component{
	constructor(){
		super(props);
		this.state = { products: [], a: ''};
		this.clicked = this.clicked.bind(this);
	}

	render(){
		return(
			<div>
				<button onClick={this.clicked}>
					Get Products
				</button>
				<ProductList items={this.state.products} />
			</div>
		);
	}

	getData(){
		let req = new XMLHttpRequest();
		req.open('POST', "products.php");
		req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		req.onload = function(){
			if (req.status == 200){
				alert(this.responseText);
			}
			else {
				alert("error");
			}
		}
		let params = "action=products";
		req.send(params);
	}
}