---
layout: post
title:  "Hello Go Webserver!"
tags: how-to golang go hello-world http webserver html template
---

Let's spin up a simple webserver using Golang to handle HTTP 
requests and serve HTML content rendered from template files.

## Prerequisites:

Working `go` installation[^install-go]

---
## Part 1: Basic webserver 

Create a directory for the project (mine is named `websrv-proj`) and place the following in a file named `main.go`.

{% include code-label.html content="***~/websrv-proj/main.go***" %}
```golang
package main

import (
  "fmt"
  "log"
  "net/http"
)

// baseHandler is run when the server receives a request to the 
// "<server-address>:<server-port>/" url route.
func baseHandler(w http.ResponseWriter, r *http.Request) {
  fmt.Fprint(w, "Hello World!")
}

// main() registers http handlers, and starts listening for inbound TCP 
// requests on port `:8888`.
func main() {
  http.HandleFunc("/", baseHandler)
  log.Fatal(http.ListenAndServe(":8888", nil))
}
```

We can run this script and make requests to the server via command line or web browser.

{% include code-label.html content="***~/websrv-proj***" %}
```bash
$ go run main.go &
$ curl http://localhost:8888/
Hello World!
```

<br>

![string-resp](/assets/img/string-resp.png)

---
## Part 2: Render HTML from Template

Okay, so we have a server listening on a port and it's ready to handle requests to 
the "/" route. Let's make this a webpage and return some HTML instead of a string. 
Let's create a simple template file[^go-template-docs] in the project directory.

{% include code-label.html content="***~/websrv-proj/index.html.tmpl***" %}
```html
<!doctype html>
<html>
  <head>
  </head>
  <body>
    <div>
      <p>{{ '{{' }} . }}</p>
    </div>
  </body>
</html>
```

- Now we have a template file that's expecting a single template variable as input.
  We can update the handler to execure the template with a string argument and return 
  the rendered HTML.


```golang
func handler(w http.ResponseWriter, r *http.Request) {
  t, _ := template.ParseFiles("index.html.tmpl")
  t.Execute(w, "Hello World!"); err != nil {
}
```

<br>

![html-resp](/assets/img/html-resp.png)

---
## Part 3: Extend the HTML template

- We can update our template to make it easier to add new functionality.

{% include code-label.html content="******" %}
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="site">
    <title>site</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
  </head>
  <body>
    <main class="container" style="padding: 25px;">
      <div>
      <figure class="text-center">
        <blockquote class="blockquote">
          <p>{{ '{{' }} . }}</p>
        </blockquote>
      </figure>
      </div>
    </main>
  </body>
</html>
```

<br>

![style-resp](/assets/img/styled.png)

---
## Wrapping up

At this point we should have an HTTP server listening for requests to the
`/` route on port `:8888`. 

What next?

- refactor into a module
- add more pages and content
- change the bootstrap theme / general styling
- use a web framework / middleware package with more features
- deploy on a cloud provider (Digital Ocean, Heroku, etc)
- add a form and do something with the input
- ...

---

{% include refs.md %}