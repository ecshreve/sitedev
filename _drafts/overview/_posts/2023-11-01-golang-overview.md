---
layout: post
tags: golang go development coding
---

{% include toolref.html tool = "golang" %}

## Summary

Initially I started learning Go because I the company I was working for used it and I was trying to transfer departments into engineering at the time. In the 5 years since I've used it for a number of personal projects, and have grown to really enjoy it. I've used it to build CLI tools, servers to handle HTTP requests, web applications, and more.

## Memorable Challenges

### Iterating over a map is not deterministic

In Go (Golang), iterating over maps is non-deterministic, meaning that the order in which you traverse the elements of a map is not guaranteed to be the same across iterations, even if the map itself has not changed. This characteristic can lead to unexpected behavior, especially when dealing with use cases like time series data or form data where the order of elements is significant.

I've also run into this in the context of unit testing, where I've had flaky tests that relied on iterating over a map of dependent testcases, or snapshotting the output of a function that iterated over a map.


{% include refs.md %}
