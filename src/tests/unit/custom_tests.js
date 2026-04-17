const { clamp, lerp } = require("../../ts/math/math");
const { magnitude, normalize, add } = require("../../ts/math/vector");
describe("Custom unit tests", () => {
  it("clamp keeps a value inside the range", () => {
    expect(clamp(0, 100, 55)).toBe(55);
  });

  it("lerp returns the start value when percent is 0", () => {
    expect(lerp(5, 15, 0)).toBe(5);
  });

  it("magnitude returns the length of a 3-4-5 vector", () => {
    expect(magnitude({ x: 3, y: 4 })).toBe(5);
  });

  it("normalize returns a unit vector for 3-4", () => {
    expect(normalize({ x: 3, y: 4 })).toEqual({
      x: 0.6,
      y: 0.8,
    });
  });

  it("add adds two vectors component by component", () => {
    expect(add({ x: 2, y: 3 }, { x: 4, y: 5 })).toEqual({
      x: 6,
      y: 8,
    });
  });
});
