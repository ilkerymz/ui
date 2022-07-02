import Dexie from 'dexie';
import { PLUGIN_KEYS } from '../constants';

export const db = new Dexie('gturover-db');

export const LIMIT = 60;

const dbStructure = {
  [PLUGIN_KEYS.ZED_IMAGE]: '++id, secs',
  [PLUGIN_KEYS.ROSOUT]: '++id, secs',
  [PLUGIN_KEYS.ORIENTATION]: '++id, secs',
};

const KEYS = Object.keys(dbStructure);

const getAll = () => KEYS.map((key) => db[key]);

db.version(1).stores(dbStructure);

export const resetDatabase = () => {
  return db.transaction('rw', ...getAll(), async () => {
    await Promise.all(db.tables.map((table) => table.clear()));
  });
};
