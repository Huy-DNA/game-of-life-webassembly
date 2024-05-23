# Conway's game of life with webassembly

This repo is my first try at rust webassembly following the instruction on the rustasm's tutorial.

Some difficulties I've faced:
* Webasm reaches `unreachable`: Most of this is because the vector index was out-of-bound.
