import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be create LocalStorageService', () => {
    expect(service).toBeTruthy();
  });

  it('should set item to local storage when setItem is called', () => {
    const key = 'testKey';
    const value = { data: 'testValue' };

    service.setItem(key, value);
    const retrievedValue = service.getItem(key);

    expect(retrievedValue).toEqual(value);
  });

  it('should get item from local storage when getItem is called', () => {
    const key = 'testKey';
    const value = { data: 'testValue' };

    service.setItem(key, value);
    const retrievedValue = service.getItem(key);

    expect(retrievedValue).toEqual(value);
  });

  it('should return null for non-existing key', () => {
    const key = 'nonExistingKey';
    const retrievedValue = service.getItem(key);

    expect(retrievedValue).toBeNull();
  });

  it('should remove item from local storage when removeItem with argument toBeRemoved is called', () => {
    const key = 'toBeRemoved';
    const value = { data: 'testValue' };

    service.setItem(key, value);
    service.removeItem(key);

    const retrievedValue = service.getItem(key);

    expect(retrievedValue).toBeNull();
  });

  it('should clear all items from local storage when clear is called', () => {
    const key1 = 'key1';
    const value1 = { data: 'value1' };

    service.setItem(key1, value1);
    service.clear();

    const retrievedValue1 = service.getItem(key1);

    expect(retrievedValue1).toBeNull();
  });
});
