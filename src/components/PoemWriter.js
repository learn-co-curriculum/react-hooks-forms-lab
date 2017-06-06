import React from 'react';

class PoemWriter extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <textarea 
          rows="3" 
          cols="60" 
        />
        <div 
          id="poem-validation-error" 
          style={{color: 'red'}}
        >
          This poem is not written in the right structure!
        </div>
      </div>
    );
  }
}

export default PoemWriter;