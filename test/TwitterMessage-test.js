import React from 'react';
import { shallow } from 'enzyme';

import TwitterMessage from '../components/TwitterMessage';

describe('<TwitterMessage />', function () {
  describe('Saving input value in state', function () {
    it('should update the state when typing', function () {
      const wrapper = shallow(<TwitterMessage maxChars={10} />);
      const event = { target: { value: 'f' } };
      wrapper.find('input').simulate('change', event);
      expect(wrapper.find('input').props().value).toEqual(event.target.value, 'The input value is not being updated when it changes');
    });
  });

  describe('Character counter', function () {
    it('should show the remaining characters counter', function () {
      const wrapper = shallow(<TwitterMessage maxChars={10} />);
      expect(wrapper.contains(10)).toBeTruthy('The maxChars prop is not being rendered in the component');
    });

    it('should update the counter when typing', function () {
      const wrapper = shallow(<TwitterMessage maxChars={10} />);
      const event = { target: { value: 'f' } };
      wrapper.find('input').simulate('change', event);
      expect(wrapper.contains(9)).toBeTruthy('The character counter does not update when typing');
    });
  });
});
