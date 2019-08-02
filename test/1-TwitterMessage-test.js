import React from "react";
import { expect } from "chai";
import { configure, shallow } from "enzyme";

import TwitterMessage from "../src/components/TwitterMessage";
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe("<TwitterMessage />", () => {
  describe("Saving input value in state", () => {
    it("should update the state when typing", () => {
      const wrapper = shallow(<TwitterMessage maxChars={280} />);
      const event = { target: { value: "f", id: "message", name: "message" } };
      wrapper.find("input").simulate("change", event);
      expect(wrapper.find("input").props().value).to.deep.equal(
        event.target.value,
        "The input value is not being updated when it changes"
      );
    });
  });

  describe("Character counter", () => {
    it("should show the remaining characters counter", () => {
      const wrapper = shallow(<TwitterMessage maxChars={280} />);
      expect(
        wrapper.contains(280),
        "The maxChars prop is not being rendered in the component"
      ).to.be.true;
    });

    it("should update the counter when typing", () => {
      const wrapper = shallow(<TwitterMessage maxChars={280} />);
      const event = { target: { value: "f", id: "message", name: "message" } };
      wrapper.find("input").simulate("change", event);
      expect(
        wrapper.contains(279),
        "The character counter does not update when typing"
      ).to.be.true;
    });
  });
});
