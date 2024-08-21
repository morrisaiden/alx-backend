#!/usr/bin/env python3
from collections import OrderedDict
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """FIFO caching system implementation"""

    MAX_ITEMS = 4

    def __init__(self):
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """Add an item to the cache"""
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data.move_to_end(key)
        elif len(self.cache_data) >= FIFOCache.MAX_ITEMS:
            oldest_key, _ = self.cache_data.popitem(last=False)
            print(f"DISCARD: {oldest_key}")

        self.cache_data[key] = item

    def get(self, key):
        """Retrieve an item from the cache"""
        if key is None:
            return None
        return self.cache_data.get(key, None)

    def print_cache(self):
        """Print the cache content"""
        print("Current cache:")
        for key, item in self.cache_data.items():
            print(f"{key}: {item}")
