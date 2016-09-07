const React = require('react');
const sinon = require('sinon');
const { shallow } = require('enzyme');

const PoemWriter = require('../components/PoemWriter');
const { isValueInState } = require('./util');

const INVALID_POEM = `${'word '.repeat(2)}
${'word '.repeat(5)}`;

const VALID_POEM = `${'word '.repeat(5)}
${'word '.repeat(3)}
${'word '.repeat(5)}`;

const VALID_POEM_WITH_EXTRA_WHITESPACE = `${'word '.repeat(5)}
  ${'word '.repeat(3)}
${'word '.repeat(5)}  `;

describe('<PoemWriter />', function () {
  const spy = sinon.spy();

  afterEach(() => {
    spy.reset();
  });

  describe('Saving input value in state', function () {
    it('should save the poem content in the state when the textarea value changes', function () {
      const wrapper = shallow(<PoemWriter />);
      wrapper.find('textarea').simulate('change', { target: { value: VALID_POEM } });
      expect(isValueInState(wrapper.state(), VALID_POEM)).toBeTruthy('The textarea value is not being saved in the state');
    });
  });

  describe('Validating the poem structure', function () {
    it('should show an error when the poem is empty', function () {
      const wrapper = shallow(<PoemWriter />);
      wrapper.find('textarea').simulate('change', { target: { value: '' } });
      expect(wrapper.find('#poem-validation-error').length).toEqual(1, 'The poem validation error is not being shown');
    });

    it('should show an error when the poem is invalid', function () {
      const wrapper = shallow(<PoemWriter />);
      wrapper.find('textarea').simulate('change', { target: { value: INVALID_POEM } });
      expect(wrapper.find('#poem-validation-error').length).toEqual(1, 'The poem validation error is not being shown');
    });

    it('should not show an error when the poem is valid', function () {
      const wrapper = shallow(<PoemWriter />);
      wrapper.find('textarea').simulate('change', { target: { value: VALID_POEM } });
      expect(wrapper.find('#poem-validation-error').length).toEqual(0, 'The poem validation error is being shown');
    });

    it('should not show an error when the poem is valid but has extra whitespace', function () {
      const wrapper = shallow(<PoemWriter />);
      wrapper.find('textarea').simulate('change', { target: { value: VALID_POEM_WITH_EXTRA_WHITESPACE } });
      expect(wrapper.find('#poem-validation-error').length).toEqual(0, 'The poem validation error is being shown');
    });
  });
});
