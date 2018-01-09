import React from "react";

const isValidPoem = poem => {
  const poemLines = poem.split("\n").map(line => line.trim()); //split the poem into an array of lines then remove any trailing whitespace with the .trim() string method
  const isRightAmountOfLines = poemLines.length === 3; //make sure we have 3 lines in the poem
  if (poem && isRightAmountOfLines) {
    return (
      /*we need to make sure each line has the requisite number of words by splitting each individual line on the empty space and creating an array of words: "is this valid".split(" ") returns ["is", "this", "valid"]; calling .length on this array returns the total word count*/
      poemLines[0].split(" ").length === 5 &&
      poemLines[1].split(" ").length === 3 &&
      poemLines[2].split(" ").length === 5
    );
  } else {
    return false;
  }
};

class PoemWriter extends React.Component {
  constructor() {
    super();

    this.state = {
      content: "",
      isValid: true,
    };
  }

  setPoemContent = event => {
    const content = event.target.value;
    this.setState({
      content,
      isValid: isValidPoem(content),
    });
  };

  render() {
    return (
      <div>
        <textarea
          rows="3"
          cols="60"
          value={this.state.content}
          onChange={this.setPoemContent}
        />
        {!this.state.isValid && (
          <div id="poem-validation-error" style={{ color: "red" }}>
            This poem is not written in the right structure!
          </div>
        )}
      </div>
    );
  }
}

export default PoemWriter;
