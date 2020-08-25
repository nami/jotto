import React, { Component } from 'react';
import { connect } from 'react-redux';

class Input extends Component {
  render() {
  	const inputForm = 		
  		(
  			<form className="form-inline">
				<input 
					data-test="input-box"
					className="mb-2 mx-sm-3"
					type="text"
					placeholder="Enter guess..."/>
				<button
					data-test="submit-button"
					className="btn btn-primary mb-2"
					type="submit">
					Submit
				</button>
			</form>
		)
  	const contents = this.props.success ? null : inputForm
    return (
      <div data-test="component-input">
      	{ contents }
      </div>
    )
  }
}

const mapStateToProps = ({ success }) => {
	return { success }
}


export default connect(mapStateToProps)(Input);