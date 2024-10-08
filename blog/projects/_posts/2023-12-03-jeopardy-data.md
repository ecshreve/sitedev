---
layout: post
desc: This write-up focuses on a few projects I've worked on over the years related to the game show Jeopardy!
image: assets/images/jepp.png
tags: jeopardy golang graphql react flask sqlite mysql ent codegen api
---

Overall, these three repositories reflect a focus on leveraging and exploring Jeopardy! data through web technologies, including Go, Flask, React, GraphQL, and database management. Each project demonstrates a unique application of this data, from API access and gameplay to data exploration tools.

## Jepp

[Jepp Live](https://jepp.app) | 
[Jepp Github Repository](https://github.com/ecshreve/jepp)

This project is live, and provides an API for accessing over 100,000 Jeopardy clues. It uses a Go web server and Gin framework to expose endpoints for accessing historical Jeopardy data. The frontend/UI consists of HTML templates displaying Swagger docs and a sample request. The database used is SQLite, which replaced a deprecated MySQL setup, making the app easier to deploy and test.

## Jexplore

[Jexplore Github Repository](https://github.com/ecshreve/jexplore)

Jexplore builds on the Jepp project, but focuses on generating as much code as possible from a single shema definition. It utilizes the ent framework to generate a GraphQL API, a React frontend, and a Go backend. The project is still a work in progress, but the goal is to provide a more robust API and frontend for accessing and exploring Jeopardy data.

## Jeppy

[Jeppy Github Repository](https://github.com/ecshreve/jeppy)

Jeppy is a project focused on playing historical Jeopardy games. It involves scraping Jeopardy questions and answers, dumping the data to a JSON file, populating a SQLite database, and providing a React app for gameplay. The backend is managed by a Flask app for database operations. The project uses Flask-Migrate for managing database migrations​.

This was my first project using the Jeopardy! Archive data, subsequent projects use the same data source, but in different ways.