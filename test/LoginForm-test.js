const React = require('react');
const sinon = require('sinon');
const { shallow } = require('enzyme');

const LoginForm = require('../components/LoginForm');
const { isValueInState, noop } = require('./util');

describe('<LoginForm />', function () {
  const spy = sinon.spy();

  afterEach(() => {
    spy.reset();
  });

  describe('Saving input values in state', function () {
    it('should save the username in state when the input changes', function () {
      const wrapper = shallow(<LoginForm />);
      wrapper.find('#test-username').simulate('change', { target: { value: 'johndoe' } });
      expect(isValueInState(wrapper.state(), 'johndoe')).toBeTruthy('The username input value is not being saved in the state');
    });

    it('should save the password in state when the input changes', function () {
      const wrapper = shallow(<LoginForm />);
      wrapper.find('#test-password').simulate('change', { target: { value: 'supersecret' } });
      expect(isValueInState(wrapper.state(), 'supersecret')).toBeTruthy('The password input value is not being saved in the state');
    });
  });

  describe('Calling `onSubmit` callback prop', function () {
    it('should call the prevent the default action when the form is being submitted', function () {
      const wrapper = shallow(<LoginForm />);
      wrapper.find('form').simulate('submit', { preventDefault: spy });
      expect(spy.calledOnce).toBeTruthy('The default form action is not being prevented when the form is submitted');
    });

    it('should call the `onSubmit` callback prop when the form is being submitted', function () {
      const wrapper = shallow(<LoginForm onSubmit={spy} />);
      wrapper.find('#test-username').simulate('change', { target: { value: 'johndoe' } });
      wrapper.find('#test-password').simulate('change', { target: { value: 'supersecret' } });
      wrapper.find('form').simulate('submit', { preventDefault: noop });
      expect(spy.calledOnce).toBeTruthy('The `onSubmit` prop is not being called exactly once');
    });

    it('should not call the `onSubmit` callback prop when the username and/or password fields are empty', function () {
      const wrapper = shallow(<LoginForm onSubmit={spy} />);

      wrapper.find('#test-username').simulate('change', { target: { value: '' } });
      wrapper.find('#test-password').simulate('change', { target: { value: 'supersecret' } });
      wrapper.find('form').simulate('submit', { preventDefault: noop });
      expect(spy.called).toBeFalsy('The `onSubmit` prop is being called with one or more empty form fields');

      wrapper.find('#test-username').simulate('change', { target: { value: 'johndoe' } });
      wrapper.find('#test-password').simulate('change', { target: { value: '' } });
      wrapper.find('form').simulate('submit', { preventDefault: noop });
      expect(spy.called).toBeFalsy('The `onSubmit` prop is being called with one or more empty form fields');
    });
  });
});
