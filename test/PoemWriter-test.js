import React from "react";
import { expect } from "chai";
import sinon from "sinon";
import { shallow } from "enzyme";

import PoemWriter from "../src/components/PoemWriter";
import { isValueInState } from "./util";

const INVALID_POEM = `${"word ".repeat(2)}
${"word ".repeat(5)}`;

const VALID_POEM = `${"word ".repeat(5)}
${"word ".repeat(3)}
${"word ".repeat(5)}`;

const VALID_POEM_WITH_EXTRA_WHITESPACE = `${"word ".repeat(5)}
  ${"word ".repeat(3)}
${"word ".repeat(5)}  `;

describe("<PoemWriter />", () => {
  const spy = sinon.spy();

  afterEach(() => {
    spy.reset();
  });

  describe("Saving input value in state", () => {
    it("should save the poem content in the state when the textarea value changes", () => {
      const wrapper = shallow(<PoemWriter />);
      wrapper
        .find("textarea")
        .simulate("change", { target: { value: VALID_POEM } });
      expect(
        isValueInState(wrapper.state(), VALID_POEM),
        "The textarea value is not being saved in the state"
      ).to.be.true;
    });
  });

  describe("Validating the poem structure", () => {
    it("should show an error when the poem is empty", () => {
      const wrapper = shallow(<PoemWriter />);
      wrapper.find("textarea").simulate("change", { target: { value: "h" } });
      wrapper.find("textarea").simulate("change", { target: { value: "" } });
      expect(wrapper.find("#poem-validation-error").length).to.equal(
        1,
        "The poem validation error is not being shown"
      );
    });

    it("should show an error when the poem is invalid", () => {
      const wrapper = shallow(<PoemWriter />);
      wrapper
        .find("textarea")
        .simulate("change", { target: { value: INVALID_POEM } });
      expect(wrapper.find("#poem-validation-error").length).to.equal(
        1,
        "The poem validation error is not being shown"
      );
    });

    it("should not show an error when the poem is valid", () => {
      const wrapper = shallow(<PoemWriter />);
      wrapper
        .find("textarea")
        .simulate("change", { target: { value: VALID_POEM } });
      expect(wrapper.find("#poem-validation-error").length).to.equal(
        0,
        "The poem validation error is being shown"
      );
    });

    it("should not show an error when the poem is valid but has extra whitespace", () => {
      const wrapper = shallow(<PoemWriter />);
      wrapper.find("textarea").simulate("change", {
        target: { value: VALID_POEM_WITH_EXTRA_WHITESPACE },
      });
      expect(wrapper.find("#poem-validation-error").length).to.equal(
        0,
        "The poem validation error is being shown"
      );
    });
  });
});
