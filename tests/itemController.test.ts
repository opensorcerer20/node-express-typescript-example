import { Request, Response } from 'express';

import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from '../src/controllers/itemController';
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

  it('should add an item when created', async () => {
    const req = { body: { name: 'test one' } } as Request;
    const res = {} as unknown as Response;
    items.length = 0;
    createItem(req, res, jest.fn());
    expect(items.length).toEqual(1);
    expect(items[0]?.name).toBe('test one');
  });

  it('should update an item', async () => {
    const req1 = { body: { name: 'test one' } } as Request;
    const res1 = {} as unknown as Response;

    // create item
    items.length = 0;
    createItem(req1, res1, jest.fn());

    // get id
    getItems({} as Request, {} as unknown as Response, jest.fn());
    // update item
    const req2 = {
      params: { id: items[0].id },
      body: { name: 'test two' },
    } as unknown as Request; // "as unknown as request" bypasses strict definitions for Request; otherwise i cant specify params like this
    const res2 = {} as unknown as Response;

    updateItem(req2, res2, jest.fn());
    expect(items.length).toEqual(1);
    expect(items[0]?.name).toBe('test two');
  });

  it('should delete an item', async () => {
    const req1 = { body: { name: 'test one' } } as Request;
    const req2 = { body: { name: 'test two' } } as Request;
    const res1 = {} as unknown as Response;

    // create items
    items.length = 0;
    createItem(req1, res1, jest.fn());
    createItem(req2, res1, jest.fn());

    // remove test one
    const req3 = {
      params: { id: items[0].id },
    } as unknown as Request;
    deleteItem(req3, res1, jest.fn());
    expect(items.length).toBe(1);
    expect(items[0]?.name).toBe('test two');
  });

  // @todo test getItem and getItems (need to test json return from route
});
