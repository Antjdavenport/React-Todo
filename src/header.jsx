var React = require('react');

module.exports = React.createClass({

// sets the initial state of text

	getInitialState: function() {
		return {
			text: ''
		}
	},

	render: function() {
		return <div className="input-group">
			<input 
				value={this.state.text}				
				onChange={this.handleInputChange}
				type="text" 
				className="form-control" />
			<span className="input-group-btn">
				<button 
				onClick={this.handleClick}
				className="btn btn-default" 
				type="button">
				Add
				</button>
				</span>

			</div>
	},
	handleClick: function() {
			// send value of text input to Firebase
			this.props.itemsStore.push({
				text: this.state.text,
				done: false
			});

			this.setState({text: ''});

	},
// takes the event onChange and looks at what key was pressed. Sets the state of text to that event value
	handleInputChange: function(e){
		this.setState({text: e.target.value});

	}
});