#!/usr/bin/python3
""" LFUCache module """

from base_caching import BaseCaching
from collections import defaultdict, OrderedDict


class LFUCache(BaseCaching):
    """ LFUCache class that inherits from BaseCaching """

    def __init__(self):
        """ Initialize the LFUCache """
        super().__init__()
        self.freq = defaultdict(int)
        self.order = OrderedDict()

    def _discard(self):
        """ Discard the least frequently used item """
        min_freq = min(self.freq.values())
        min_freq_keys = [key for key, freq in self.freq.items()
                         if freq == min_freq]

        if len(min_freq_keys) > 1:
            lru_key = min(min_freq_keys, key=lambda k: self.order[k])
        else:
            lru_key = min_freq_keys[0]

        del self.cache_data[lru_key]
        del self.freq[lru_key]
        del self.order[lru_key]
        print(f"DISCARD: {lru_key}")

    def put(self, key, item):
        """ Add an item to the cache """
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data[key] = item
            self.freq[key] += 1
            self.order.move_to_end(key)
        else:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                self._discard()

            self.cache_data[key] = item
            self.freq[key] = 1
            self.order[key] = len(self.order)

    def get(self, key):
        """ Get an item by key """
        if key is None or key not in self.cache_data:
            return None

        self.freq[key] += 1
        self.order.move_to_end(key)

        return self.cache_data[key]
