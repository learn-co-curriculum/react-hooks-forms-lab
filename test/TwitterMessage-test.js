import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import TwitterMessage from '../src/components/TwitterMessage';

describe('<TwitterMessage />', () => {
  describe('Saving input value in state', () => {
    it('should update the state when typing', () => {
      const wrapper = shallow(<TwitterMessage maxChars={10} />);
      const event = { target: { value: 'f' } };
      wrapper.find('input').simulate('change', event);
      expect(wrapper.find('input').props().value).to.deep.equal(event.target.value, 'The input value is not being updated when it changes');
    });
  });

  describe('Character counter', () => {
    it('should show the remaining characters counter', () => {
      const wrapper = shallow(<TwitterMessage maxChars={10} />);
      expect(wrapper.contains(10), 'The maxChars prop is not being rendered in the component').to.be.true;
    });

    it('should update the counter when typing', () => {
      const wrapper = shallow(<TwitterMessage maxChars={10} />);
      const event = { target: { value: 'f' } };
      wrapper.find('input').simulate('change', event);
      expect(wrapper.contains(9), 'The character counter does not update when typing').to.be.true;
    });
  });
});
