/* Groceries v1.5.4 — read-only startup snapshots. No cloud writes or offline outbox. */
(() => {
  'use strict';
  const DB_NAME = 'groceries-household-snapshots';
  const STORE = 'snapshots';
  let databasePromise;

  function openDatabase() {
    if (!window.indexedDB) return Promise.resolve(null);
    if (!databasePromise) {
      databasePromise = new Promise((resolve, reject) => {
        const request = window.indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, {keyPath: 'key'});
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error || new Error('IndexedDB could not open'));
        request.onblocked = () => reject(new Error('IndexedDB upgrade blocked'));
      }).catch(error => {
        databasePromise = null;
        throw error;
      });
    }
    return databasePromise;
  }
  const makeKey = (userId, householdId) => `${userId}:${householdId}`;

  async function read(userId, householdId) {
    if (!userId || !householdId) return null;
    try {
      const db = await openDatabase();
      if (!db) return null;
      const row = await new Promise((resolve, reject) => {
        const request = db.transaction(STORE, 'readonly').objectStore(STORE).get(makeKey(userId, householdId));
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
      if (!row || row.userId !== userId || row.householdId !== householdId ||
          row.household?.id !== householdId || !Array.isArray(row.items) ||
          !Array.isArray(row.storeLists) || !Array.isArray(row.customCatalog)) return null;
      return row;
    } catch (error) {
      console.warn('Groceries: local snapshot not available', error);
      return null;
    }
  }

  async function save(userId, householdId, data) {
    if (!userId || !householdId || data?.household?.id !== householdId) return false;
    try {
      const db = await openDatabase();
      if (!db) return false;
      const row = {
        key: makeKey(userId, householdId), userId, householdId, cachedAt: new Date().toISOString(),
        // Never persist the family invite code in this cache.
        household: {
          id: householdId,
          name: data.household.name,
          section_order: [...(data.household.section_order || [])]
        },
        items: data.items,
        customCatalog: data.customCatalog,
        storeLists: data.storeLists
      };
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).put(row);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error || new Error('IndexedDB write failed'));
        tx.onabort = () => reject(tx.error || new Error('IndexedDB write aborted'));
      });
      return true;
    } catch (error) {
      console.warn('Groceries: could not update local snapshot', error);
      return false;
    }
  }

  window.GROCERIES_CACHE = {read, save};
})();
