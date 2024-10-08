---
layout: post
tags: golang development coding
---

In Go (Golang), iterating over maps is non-deterministic, meaning that the order in which you traverse the elements of a map is not guaranteed to be the same across iterations, even if the map itself has not changed. This characteristic can lead to unexpected behavior, especially when dealing with use cases like time series data or form data where the order of elements is significant.

I've also run into this in the context of unit testing, where I've had flaky tests that relied on iterating over a map of dependent testcases, or snapshotting the output of a function that iterated over a map.

## Example

This example illustrates the non-deterministic nature of map iteration. The first iteration over the map is in the order that the elements were added, but the second iteration is in a different order.

```go
package main

import (
	"fmt"
)

func main() {
	// Initialize a map
	myMap := map[string]int{
		"one":   1,
		"two":   2,
		"three": 3,
		"four":  4,
		"five":  5,
	}

	// First iteration
	fmt.Println("First Iteration:")
	for key, value := range myMap {
		fmt.Printf("%s: %d\n", key, value)
	}

	fmt.Println("\nSecond Iteration:")
	// Second iteration
	for key, value := range myMap {
		fmt.Printf("%s: %d\n", key, value)
	}
}
```
[![Go Playground](https://go.dev/play/p/S5XmbldSVk5)](https://go.dev/play/p/S5XmbldSVk5)

## Solutions

### Use Slices for Ordered Data

Here, we maintain a separate slice of keys to preserve the order.

```go
package main

import (
	"fmt"
)

func main() {
	myMap := map[string]int{
		"one":   1,
		"two":   2,
		"three": 3,
		"four":  4,
		"five":  5,
	}
	keys := []string{"one", "two", "three", "four", "five"}

	for _, k := range keys {
		fmt.Printf("%s: %d\n", k, myMap[k])
	}
}
```

### Sort Keys

In this solution, we extract the keys, sort them, and then iterate over the sorted keys.

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	myMap := map[string]int{
		"one":   1,
		"two":   2,
		"three": 3,
		"four":  4,
		"five":  5,
	}

	var keys []string
	for k := range myMap {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	for _, k := range keys {
		fmt.Printf("%s: %d\n", k, myMap[k])
	}
}
```

### Custom Data Structure

Here we use a custom struct to maintain both a map for quick access and a slice for order.

```go
package main

import (
	"fmt"
)

type OrderedMap struct {
	Map   map[string]int
	Order []string
}

func main() {
	omap := OrderedMap{
		Map: map[string]int{
			"one":   1,
			"two":   2,
			"three": 3,
			"four":  4,
			"five":  5,
		},
		Order: []string{"one", "two", "three", "four", "five"},
	}

	for _, k := range omap.Order {
		fmt.Printf("%s: %d\n", k, omap.Map[k])
	}
}
```

## References

From the [Go Language Specification](https://golang.org/ref/spec#RangeClause):

> For a map, the iteration order is not specified and is not guaranteed to be the same from one iteration to the next. If map entries that have not yet been reached are removed during iteration, the corresponding iteration values will not be produced. If map entries are inserted during iteration, the behavior is implementation-dependent, but the iteration values for each entry will be produced at most once.

{% include refs.md %}