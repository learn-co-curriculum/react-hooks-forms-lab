# React Controlled Components Lab 

## Overview 

In this lab, you'll write forms, write and use controlled components, and write validation for form components. 


## Controlled Components 

Now that we know how to handle form elements in React and how to use controlled components, it's time to put that knowledge to the test. This lab is fairly extensive, but you'll use many core React concepts here that will surface again and again. Time to get some practice in!

General notes for this lab:

- Most of the DOM is pre-written for you in these exercises. Please do not remove anything that is already in the file — most of it is necessary to ensure that the tests run correctly.
- When instructed to save a value in the state, it doesn't matter what key you use, as long as it's in there!

## `TwitterMessage`
![Tweet Tweet Tweet](https://media.giphy.com/media/f4eXhcyemnGwM/giphy.gif)

1. Open the `components/TwitterMessage.js` file.
2. This component takes one prop: `maxChars` which is a number — the maximum amount of characters a message can have.
3. You'll find an `<input type="text">` in this component. Make this a controlled component by adding the necessary props to the `<input>` element. Its value should be saved in the component's state.
4. Show the _remaining_ characters in the component. It doesn't matter how you render it, as long as the number is correct. No need to guard against input that is too long — you can let the counter reach negative values.

## `LoginForm`
1. Open the `components/LoginForm.js` file.
2. This component takes one prop: `onSubmit` which is a function — this function is called when the form is being submitted.
3. You'll find two inputs in this component: `<input type="text">` and `<input type="password">`. Make this a controlled component by adding the necessary props to these inputs. Their values should be saved in the component's state.
4. An example of an input would look like: 
    ```js
    <input 
      id="test-username" 
      type="text"
      name="username"
      value={this.state.username} 
      onChange={this.handleInputChange} 
    />
    ```
5. Remember that you can retrieve the inpiut `name` and `value` of an `event.target` from the JS event.
6. Add the necessary event handler to the `<form>` element in order to call the `onSubmit` callback prop.
7. The `onSubmit` callback prop should only be called if _both_ fields are filled in (with any value).

## `PoemWriter`
![Bo Burnham](https://media.giphy.com/media/dg2p49sffdtqo/giphy.gif)

1. Open the `components/PoemWriter.js` file.
2. You'll find one `<textarea>` in this component. Make this a controlled component by adding the necessary props to this element. Its value should be saved in the component's state.
3. You'll also find an error element in the markup. This element should _only_ be shown if the poem is not valid.
4. The rules for a valid poem structure are as follows:
    - The poem has three lines.
    - The first line has five words.
    - The second line has three words.
    - The third line has five words.
5. Be sure to account for users accidentally adding too many spaces! This means that `' I am a furry dog '` is a valid first line of the poem.
6. Make sure to account for if a user types in the textarea box, but deletes all of the content that the error message is still showing.

## Resources
- [React Forms](https://facebook.github.io/react/docs/forms.html)
