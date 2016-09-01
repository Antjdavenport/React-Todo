var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://todo-98fd9.firebaseio.com/';

var App = React.createClass({
	mixins: [ ReactFire ],  
	//must first initialise the state of what I am using.
	getInitialState: function(){
		return {
			items: {},
			loaded: false
		}
	},

	// {*/ a mixin is a group of methods that sits on 1 object that are copied over to another object. In this instance we are copying over all methods from ReactFire into our component /*}

	componentWillMount: function() {      

	this.fb = new Firebase(rootUrl + 'items/');
	this.bindAsObject(this.fb, 'items');
	this.fb.on('value', this.handleDataLoaded);  

	// {*/ native react method that will run any code inside 1 time whenever the component is mounted to the DOM /*}

		this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');

		    // {*/ bindAsObject is reactfire method. made available by using the mixin to copy over the methods. Creates a new firebase object that points are our firebase URL. Any data from that object is bound to our component through bindAsObject and that data is placed onto this.state.items. */}
	},

  render: function() {

    return <div className="row panel panel-default">
      	<div className="col-md-8 col-md-offset-2">
      		<h2 className="text-center">
      		To-Do List
    		</h2>
    		<Header itemsStore={this.firebaseRefs.items} />
    		<hr />
    		<div className={"content " + (this.state.loaded ? 'loaded' : '')}>
    		
    		<List items={this.state.items} />
    		{this.deleteButton()}
    	</div>
    	</div> 
    	</div>
  },
  deleteButton: function() {
  	if(!this.state.loaded) {
  		return
  		} else {
  			return <div className="text-center clear-complete">
  			<hr />
  			<button
  				type="button"
  				onClick={this.onDeleteDoneClick}
  				className="btn btn-default">
  				Clear complete
  				</button>
  				</div>
  		}
  	
  },
  onDeleteDoneClick: function(){
  	for (var key in this.state.items){
  		if (this.state.items[key].done === true){
  			this.fb.child(key).remove();
  		}
  	}
  },
  handleDataLoaded: function(){
  	this.setState({loaded: true });


  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
