#!/usr/bin/env python3
"""_summary_

    Returns:
        _type_: _description_
"""


from collections import OrderedDict
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """_summary_

    Args:
        BaseCaching (_type_): _description_
    """

    def __init__(self):
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

        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            first_key, _ = self.cache_data.popitem(last=False)
            print(f"DISCARD: {first_key}")

        self.cache_data[key] = item

    def get(self, key):
        """_summary_

        Args:
            key (_type_): _description_

        Returns:
            _type_: _description_
        """
        return self.cache_data.get(key, None)
