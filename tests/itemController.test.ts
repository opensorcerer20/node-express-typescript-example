import { Request, Response } from 'express';

import { getItems } from '../src/controllers/itemController';
import { items } from '../src/models/item';

describe('Item Controller', () => {
  it('should return an empty array when no items exist', () => {
    const req = {} as Request;

    // replace json from response with empty jest fn
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    // make sure in memory store is empty
    items.length = 0;

    // execute request
    getItems(req, res, jest.fn());

    // test that json was called with empty array
    expect(res.json).toHaveBeenCalledWith([]);
  });
});
