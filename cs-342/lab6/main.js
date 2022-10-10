class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {name: '', pw: ''};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.nameChange = this.nameChange.bind(this);
		this.passwordChange = this.passwordChange.bind(this);
	}

	render(){
		return (this.renderLogin());
	}

	renderLogin(){
		return (
			<div>
				<div className="login">
					<h1>Login</h1>
					<form onSubmit={this.handleSubmit}>
						<label for="username">
							<i className="fas fa-user"></i>
						</label>
						<input type="text" id="username" placeholder="username" onChange={this.nameChange} value={this.state.name} />
						<label for="password">
							<i className="fas fa-lock"></i>
						</label>
						<input type="password" id="password" name="password" placeholder="password" onChange={this.passwordChange} value={this.state.pw} />
						<button>Login</button>
					</form>
				</div>
			</div>
		);
	}

	nameChange(e){
		this.setState({name: e.target.value});
	}

	passwordChange(e){
		this.setState({pw: e.target.value});
	}

	handleSubmit(e){
		e.preventDefault();
		let error = 0;
		if (this.state.name == ""){
			error = 1;
		}
		if (this.state.pw.length < 4){
			error += 2;
		}
		if (error == 0){
			this.checkUser(this.state.name, this.state.pw);
		}
		else if (error == 1){
			alert("bad username");
		}
		else if (error == 2){
			alert("bad password");
		}
		else if (error == 3){
			alert("bad username and password");
		}
	}

	Start() {
		ReactDOM.render(
			<App / >,
			document.getElementById('main')
		);
	}

	checkUser(uname, passwd) {
		let req = new XMLHttpRequest();
		req.open('POST', "authenticate.php");
		req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		req.onload = function()
		{
			if (req.status == 200) {
				if (this.responseText.includes("true")){
					alert("yay");
				}
				else {
					alert("boo");
				}
			}
			else {
				alert("boo who");
			}
		}
		let params = "action=data&username="+ uname + "&password=" + passwd +"";
		req.send(params);
	}
}

const instance = new App();
instance.Start();