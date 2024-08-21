#!/usr/bin/env python3
"""
a class LIFOCache that inherits from BaseCaching and is a caching system:
"""

from collections import OrderedDict
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """_summary_

    Args:
        BaseCaching (_type_): _description_
    """

    def __init__(self):
        """_summary_
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """_summary_

        Args:
            key (_type_): _description_
            item (_type_): _description_
        """
        if key is None or item is None:
            return
        if key not in self.cache_data:
            if len(self.cache_data) + 1 > BaseCaching.MAX_ITEMS:
                last_key, _ = self.cache_data.popitem(True)
                print("DISCARD: {}".format(last_key))
        self.cache_data[key] = item
        self.cache_data.move_to_end(key, last=True)

    def get(self, key):
        """_summary_

        Args:
            key (_type_): _description_
        """
        return self.cache_data.get(key, None)
