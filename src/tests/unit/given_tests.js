import { clamp, lerp } from '../../src/ts/math';
import {
  toVector,
  toPolarVector,
  distance
} from '../../src/ts/polar-vector';
import {
  normalize,
  magnitude,
  lerp as vectorLerp,
  dot,
  add,
  subtract,
  mulFactor
} from '../../src/ts/vector';

describe('Given tests - math helpers', () => {
  it('clamp returns the value when it is inside the range', () => {
    expect(clamp(1, 10, 5)).toBe(5);
  });

  it('clamp returns the minimum when the value is too small', () => {
    expect(clamp(1, 10, -12)).toBe(1);
  });

  it('clamp returns the maximum when the value is too large', () => {
    expect(clamp(1, 10, 99)).toBe(10);
  });

  it('lerp returns the interpolated number', () => {
    expect(lerp(1, 10, 0.5)).toBe(5.5);
  });

  it('magnitude returns the length of a vector', () => {
    expect(magnitude({ x: 3, y: 4 })).toBe(5);
  });

  it('normalize returns a unit vector', () => {
    expect(normalize({ x: 3, y: 4 })).toEqual({
      x: 0.6,
      y: 0.8
    });
  });

  it('dot returns the scalar product', () => {
    expect(dot({ x: 5, y: 50 }, { x: 10, y: 100 })).toBe(5050);
  });

  it('add returns the sum of two vectors', () => {
    expect(add({ x: 5, y: 50 }, { x: 10, y: 100 })).toEqual({
      x: 15,
      y: 150
    });
  });

  it('subtract returns the difference of two vectors', () => {
    expect(subtract({ x: 5, y: 50 }, { x: 10, y: 100 })).toEqual({
      x: -5,
      y: -50
    });
  });

  it('mulFactor multiplies a vector by a factor', () => {
    expect(mulFactor({ x: 2, y: -3 }, 4)).toEqual({
      x: 8,
      y: -12
    });
  });

  it('vector lerp returns interpolated vector components', () => {
    expect(vectorLerp({ x: 0, y: 10 }, { x: 10, y: 20 }, 0.5)).toEqual({
      x: 5,
      y: 15
    });
  });

  it('toVector converts polar coordinates to cartesian coordinates', () => {
    const result = toVector({ angle: 0, radius: 5 });
    expect(result.x).toBeCloseTo(5);
    expect(result.y).toBeCloseTo(0);
  });

  it('toPolarVector converts cartesian coordinates to polar coordinates', () => {
    const result = toPolarVector({ x: 3, y: 4 });
    expect(result.radius).toBeCloseTo(5);
    expect(result.angle).toBeCloseTo(Math.atan2(4, 3));
  });

  it('distance returns the euclidean distance for vectors', () => {
    expect(distance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
  });
});