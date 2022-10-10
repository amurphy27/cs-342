class TodoApp extends React.Component {
	constructor(props){
		super(props);
		this.state = {items: [], text: ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	render() {//calls todolist to render the current list then sets up the form to add more
		return (
			<div>
				<h3>TODO</h3>
				<TodoList items={this.state.items} />
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="new-todo">
						What needs to be done?
					</label>
					<input
						id="new-todo"
						onChange={this.handleChange}
						value={this.state.text}
					/>
					<button>
						Add #{this.state.items.length + 1}
					</button>
				</form>
			</div>
		);
	}

	handleChange(e) {
		this.setState({text: e.target.value});
	}

	//controls what happens when form is submitted
	handleSubmit(e) {
		e.preventDefault();//makes sure default action does not occur
		if (this.state.text.length === 0){//if there is no text do nothing
			return;
		}
		const newItem = {text: this.state.text, id: Date.now()};//if there is text create a new item with id of date
		this.setState(state => ({//rerenders with new state
			items: state.items.concat(newItem),
			text: ''
		}));
	}
}

//this just adds list items to the unordered list
class TodoList extends React.Component {
	render() {
		return (
			<ul>
				{this.props.items.map(item => (
					<li key={item.id}>{item.text}</li>
				))}
			</ul>
		);
	}
}

//puts the html created by TodoApp into the main div
ReactDOM.render(
	<TodoApp />,//function
	document.getElementById('main')//container to put in to
);