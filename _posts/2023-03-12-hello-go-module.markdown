---
layout: post
title:  "Hello Go Module"
tags: golang how-to hello-world go basic makefile testing tutorial
---

Let's create a basic go module with a package and a `Makefile` to build and run it.

## Prerequisites:

- Working `go` installation[^install-go]
  
## Part 1: Create a Module 

Create directory structure for basic module, adapted from the standard layout.[^standard-layout]

```bash
$ mkdir example.com
$ mkdir example.com/basic
$ mkdir example.com/basic/cmd
$ mkdir example.com/basic/cmd/basic
$ touch example.com/basic/cmd/basic/main.go
```

Implement basic hello world functionality.

{% include code-label.html content="_example.com/basic/cmd/basic/main.go_" %}
```go
package main

import "fmt"

func main() {
	fmt.Println("Hello Basic World")
}
```

Initialize go module and run it.

{% include code-label.html content="***~/example.com/basic***" %}
```bash
$ go mod init example.com/basic
$ go run cmd/basic/main.go
Hello Basic World
```

At this point we should have a directory structure like this

```bash
├── basic
│   ├── cmd
│   │   └── basic
│   │       └── main.go
│   └── go.mod
```

---

## Part 2: Move Functionality to a package

{% include code-label.html content="***~/example.com/basic***" %}
```bash
$ mkdir example.com/basic/pkg
$ mkdir example.com/basic/pkg/hello
$ touch example.com/basic/pkg/hello/hello.go
```

Implement public function in the new package to print a message.
  
{% include code-label.html content="_example.com/basic/pkg/hello/hello.go_" %}
```go
package hello

import "fmt"

func PrintMessage() {
	fmt.Println("Hello Basic Package World")
}
```

Import `hello` package and call the function.

{% include code-label.html content="_example.com/basic/cmd/basic/main.go_" %}
```go
package main

import "example.com/basic/pkg/hello"

func main() {
	hello.PrintMessage()
}
```

{% include code-label.html content="***~/example.com/basic***" %}
```bash
$ go run cmd/basic/main.go    
Hello Basic Package World
```

---

## Part 3: Add a Makefile

Confirm `make` installed.[^makefile-docs]

```bash
$ which make                  
/usr/bin/make
```

{% include code-label.html content="_example.com/basic/Makefile_" %}
```makefile
go-build:
	go build -o bin/basic example.com/basic/cmd/basic

go-run: go-build
	bin/basic
```

Use the `Makefile` target to build and run.

{% include code-label.html content="***~/example.com/basic***" %}
```bash
$ make go-run
go build -o bin/basic example.com/basic/cmd/basic
bin/basic
Hello Basic Package World
```

Ignore the `bin/` directory in source control.

{% include code-label.html content="***~/example.com/basic***" %}
```bash
$ echo "bin/" > .gitignore
```

Now the project directory should look like this.
  
```bash
├── basic
│   ├── .gitignore
│   ├── Makefile
│   ├── bin
│   │   └── basic
│   ├── cmd
│   │   └── basic
│   │       └── main.go
│   ├── go.mod
│   └── pkg
│       └── hello
│           └── hello.go
```

---

## Part 4: Add Functionality

Let's add some arbitrary functionality to our `hello` package. Here we define a type,
a const, a constructor, and a method. This is a contrived example and doesn't have
any meaning.

{% include code-label.html content="_example.com/basic/pkg/hello/hello.go_" %}
```go
package hello

import (
	"fmt"
)

// MAX_MESSAGE_LEN is the max allowed length for a message.
const MAX_MESSAGE_LEN = 12

// Message represents a string value.
type Message struct {
	Val string
}

// NewMessage validates the string argument, and either initializes and returns
// a new Message, or an error.
func NewMessage(s string) (*Message, error) {
	if len(s) >= MAX_MESSAGE_LEN {
		return nil, fmt.Errorf("invalid arg, length %d of argument exceeds configured max length of %d", len(s), MAX_MESSAGE_LEN)
	}

	return &Message{
		Val: s,
	}, nil
}

// Print outputs the message value to stdout.
func (m *Message) Print() {
	fmt.Println(m.Val)
}
```

We also need to update `main.go` accordingly, now we create a `Message` and call
it's `Print` method. We also check and handle the error returned from `NewMessage`.

{% include code-label.html content="_example.com/basic/cmd/basic/main.go_" %}
```go
package main

import (
	"log"

	"example.com/basic/pkg/hello"
)

func main() {
	m, err := hello.NewMessage("Hello Method World")
	if err != nil {
		log.Fatal(err)
	}

	m.Print()
}
```

We can run everything with the same `Makefile` target.

{% include code-label.html content="***~/example.com/basic***" %}
```bash
$ make go-run
go build -o bin/basic example.com/basic/cmd/basic
bin/basic
2023/03/15 08:35:36 invalid arg, length 18 of argument exceeds configured max length of 14
make: *** [Makefile:5: go-run] Error 1
```

Well look at that the validation works! Let's fix the argument so it's valid, 
replace `"Hello Method World"` with `"Hello M World"`.

{% include code-label.html content="***~/example.com/basic***" %}
```bash
$ make go-run                  
go build -o bin/basic example.com/basic/cmd/basic
bin/basic
Hello M World
```

---

## Part 5: Add a Test

Now our package has some functionality we can write automated tests for.

{% include code-label.html content="_example.com/basic/pkg/hello/hello_test.go_" %}
```go
package hello_test

import (
	"strings"
	"testing"

	"example.com/basic/pkg/hello"
	"github.com/stretchr/testify/assert"
)

func TestMessage(t *testing.T) {
	testcases := []struct {
		desc      string
		input     string
		expectErr bool
	}{
		{
			desc:  "empty input valid",
			input: "",
		},
		{
			desc:  "input shorter than MAX_MESSAGE_LEN valid",
			input: "Hello World",
		},
		{
			desc:      "input equal to MAX_MESSAGE_LEN invalid",
			input:     strings.Repeat("H", hello.MAX_MESSAGE_LEN),
			expectErr: true,
		},
		{
			desc:      "input longer than MAX_MESSAGE_LEN invalid",
			input:     strings.Repeat("H", hello.MAX_MESSAGE_LEN+1),
			expectErr: true,
		},
	}

	for _, tc := range testcases {
		actual, err := hello.NewMessage(tc.input)

		if tc.expectErr {
			assert.Error(t, err)
			assert.Nil(t, actual)
		} else {
			assert.NoError(t, err)
			assert.Equal(t, tc.input, actual.Val)
		}
	}
}
```

Note the import of `testify/assert`[^testify-repo], this is what I use because it's
what I always remember using, ymmv. Run `go mod tidy` to 
add the package to the module.

```
$ go mod tidy
go: finding module for package github.com/stretchr/testify/assert
go: found github.com/stretchr/testify/assert in github.com/stretchr/testify v1.8.2
```

Run all the tests in the package (which is just the one for now).

{% include code-label.html content="***~/example.com/basic***" %}
```bash
$ go test  ./...
?       example.com/basic/cmd/basic     [no test files]
ok      example.com/basic/pkg/hello     0.014s
```

Add some targets to the `Makefile` for test related tasks.

{% include code-label.html content="_example.com/basic/Makefile_" %}
```makefile
go-build:
	go build -o bin/basic example.com/basic/cmd/basic

go-run: go-build
	bin/basic

go-test:
	go test example.com/basic/...

go-testv:
	go test -v example.com/basic/...

go-all:
	test build run
```

Test, build, and run using the new `Makefile` targets.

{% include code-label.html content="***~/example.com/basic***" %}
```bash
$ make go-all
go test example.com/basic/...
?       example.com/basic/cmd/basic  [no test files]
ok      example.com/basic/pkg/hello  (cached)
go build -o bin/basic example.com/basic/cmd/basic
bin/basic
Hello M World
```

## Wrapping Up

At this point we have a functioning `go` module with a public package that
includes automated tests, and a `Makefile` with targets to test, build, and run 
the module.

What next?

- Migrate from `Makefile` to `Taskfile`[^taskfile-docs]
- Package the app into a Docker[^docker-docs] container
- Configure CI to automatically run builds (something like Github Actions)
- Create an Ansible playbook to take care of bootstrapping a new module
- ...
  
---

{% include refs.md %}