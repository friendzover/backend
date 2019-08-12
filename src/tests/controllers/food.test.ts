import { expect } from 'chai';
import 'mocha';

import controller from "../../food/food.controller"

describe('Hello function', () => {
  it('should return hello world', () => {
    const result = controller.getFoods();
    expect(result).to.equal('Hello World!');
  });
});