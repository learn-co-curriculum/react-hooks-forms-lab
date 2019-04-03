import React from "react";
import { expect } from "chai";
import sinon from "sinon";
import { configure, shallow, mount } from "enzyme";
import App from "../src/App";
import LoginForm from "../src/components/LoginForm";
import { isValueInState, noop } from "./util";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<LoginForm />", () => {
  describe("Saving input values in state", () => {
    it("should save the username in state when the input changes", () => {
      const wrapper = shallow(<LoginForm />);

      wrapper.find("#username").simulate("change", {
        target: { name: "username", id: "username", value: "johndoe" }
      });
      expect(
        isValueInState(wrapper.state(), "johndoe"),
        "The username input value is not being saved in the state"
      ).to.be.true;
    });

    it("should save the password in state when the input changes", () => {
      const wrapper = shallow(<LoginForm />);
      wrapper.find("#password").simulate("change", {
        target: {
          name: "password",
          id: "password",
          value: "supersecret"
        }
      });
      expect(
        isValueInState(wrapper.state(), "supersecret"),
        "The password input value is not being saved in the state"
      ).to.be.true;
    });
  });

  describe("Calling `handleLogin` callback prop", () => {
    it("should call the prevent the default action when the form is being submitted", () => {
      let spy = sinon.spy();
      const wrapper = mount(<App />);
      wrapper.find("form").simulate("submit", { preventDefault: spy });

      expect(
        spy.calledOnce,
        "The default form action is not being prevented when the form is submitted"
      ).to.be.true;
    });

    it("should not call the `handleLogin` callback prop when the username and/or password fields are empty", () => {
      let spy = sinon.spy()
      const wrapper = shallow(<LoginForm handleLogin={spy} />);

      wrapper.find("#username").simulate("change", {
        target: { name: "username", id: "username", value: "" }
      });
      wrapper.find("#password").simulate("change", {
        target: {
          name: "password",
          id: "password",
          value: "supersecret"
        }
      });
      wrapper.find("form").simulate("submit", { preventDefault: noop });
      expect(
        spy.called,
        "The `handleLogin` prop is being called with one or more empty form fields"
      ).to.be.false;

      wrapper.find("#username").simulate("change", {
        target: { name: "username", id: "username", value: "johndoe" }
      });
      wrapper.find("#password").simulate("change", {
        target: { name: "password", id: "password", value: "" }
      });
      wrapper.find("form").simulate("submit", { preventDefault: noop });
      expect(
        spy.called,
        "The `handleLogin` prop is being called with one or more empty form fields"
      ).to.be.false;
    });

    it("should call the `handleLogin` callback prop when the form is being submitted", () => {
      let spy = sinon.spy()
      const wrapper = shallow(<LoginForm handleLogin={spy} />);
      wrapper.find("#username").simulate("change", {
        target: { name: "username", id: "username", value: "johndoe" }
      });
      wrapper.find("#password").simulate("change", {
        target: {
          name: "password",
          id: "password",
          value: "supersecret"
        }
      });
      wrapper.find("form").simulate("submit", { preventDefault: noop });
      expect(spy.called, "The `handleLogin` prop is not being called").to.be.true;
    });
  });
});
