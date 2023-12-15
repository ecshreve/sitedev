---
layout: post
title: "Extend Go Module"
tags: golang go taskfile ansible template
---

Let's build out a go module.

## Prerequisites

Assumes we're working with the module setup from the end of [Hello Go Module]({% post_url how-to/2023-03-12-hello-go-module %}).

It should look like this:
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
│   ├── go.sum
│   └── pkg
│		   └── hello
│		        ├── hello.go
│		        └── hello_test.go     
```

## Part 1: Use a Taskfile

Let's use `task`[^taskfile-docs] instead of `make` for this project. Install `task`[^task-install]
if needed. 

{% include code-label.html content="***~/***" %}
```bash
$ wget https://github.com/go-task/task/releases/download/v3.22.0/task_linux_amd64.tar.gz
$ tar -C /usr/bin -xvf task_linux_amd64.tar.gz
$ rm task_linux_amd64.tar.gz
$ which task
/usr/bin/task
```

Here's a more or less equivalent `Taskfile` for the existing `Makefile`.

{% include code-label.html content="_~/example.com/basic/Taskfile.yml_" %}
```
version: "3"

tasks:
  go:test:
    cmds:
      - go test example.com/basic/...

  go:test:verbose:
    cmds:
      - go test -v example.com/basic/...

  go:build:
    generates:
      - bin/basic
    sources:
      - ./**/*.go
    cmds:
      - go build -o bin/basic example.com/basic/cmd/basic

  go:run:
    deps:
      - go:build
      - go:test
    cmds:
      - bin/basic
```

{% include code-label.html content="***~/example.com/basic***" %}
```bash
$ task go:run
task: [go:test] go test example.com/basic/...
task: [go:build] go build -o bin/basic example.com/basic/cmd/basic
?       example.com/basic/cmd/basic     [no test files]
ok      example.com/basic/pkg/hello     (cached)
task: [go:run] bin/basic
Hello M World
```

Woohoo! Looks like everything is still working and using the new Taskfile. Now we
can remove the old `Makefile`: `rm Makefile`.

---

## Part 2: Bootstrap with an Ansible Playbook

Here we build an Ansible playbook and set of template files so we can quickly and
easily spin up a new module with a default structure and contents. Each piece of the 
playbook is broken down below.

Check for a `task` installation. This could probably be changed into a choice
between Taskfile or Makefile.

```yml
- name: Install `task`
  ansible.builtin.unarchive:
    src: https://github.com/go-task/task/releases/download/v3.22.0/task_linux_amd64.tar.gz
    dest: /usr/local/bin
    remote_src: true
    creates: /usr/local/bin/task
```

Loop[^ansible-loops] through a list of directories to create.
{% raw %}
```yml
- name: Create module directories
  ansible.builtin.file:
    path: '{{ item }}'
    state: directory
    mode: '0755'
  loop:
    - '{{ module_dir }}'
    - '{{ module_dir }}/{{ module_name }}'
    - '{{ module_dir }}/{{ module_name }}/cmd/{{ module_name }}'
    - '{{ module_dir }}/{{ module_name }}/pkg/hello'
```
{% endraw %}

Create general configuration files from templates[^ansible-templates].
{% raw %}
```yml
- name: Create taskfile
  ansible.builtin.template:
    src: files/Taskfile.yml.tpl
    dest: '{{ module_dir }}/{{ module_name }}/Taskfile.yml'
    mode: '0755'
- name: Create gitignore file
  ansible.builtin.copy:
    src: files/.gitignore_base
    dest: '{{ module_dir }}/{{ module_name }}/.gitignore'
    mode: '0755'
```
{% endraw %}

files/Taskfile.yml.tpl

{% raw %}
```handlebars
version: "3"

tasks:
  go:test:
    cmds:
      - go test {{module_import_path}}/...

  go:test:verbose:
    cmds:
      - go test -v {{module_import_path}}/...

  go:build:
    generates:
      - bin/{{module_name}}
    sources:
      - ./**/*.go
    cmds:
      - go build -o bin/{{module_name}} {{module_import_path}}/cmd/{{module_name}}

  go:run:
    deps:
      - go:build
      - go:test
    cmds:
      - bin/{{module_name}}
```
{% endraw %}

files/.gitignore_base
```
bin/
.task/
.vscode/
```

Create `go` files from templates. Loop through a list of `filename` > `path` mappings
and create the `go` file at that path for the template.

{% raw %}
```yml
- name: Create go files
  ansible.builtin.template:
    src: files/{{ item.key }}.go.tpl
    dest: '{{ module_dir }}/{{ module_name }}/{{ item.value }}/{{ item.key }}.go'
    mode: '0755'
  loop: '{{ go_templates | dict2items }}'
  vars:
    go_templates:
      hello: pkg/hello
      hello_test: pkg/hello
      main: cmd/{{ module_name }}
```
{% endraw %}

files/main.go.tpl

{% raw %}
```handlebars
package main

import (
	"log"

	"{{module_import_path}}/pkg/hello"
)

func main() {
	m, err := hello.NewMessage("Hello Method World")
	if err != nil {
		log.Fatal(err)
	}

	m.Print()
}
```
{% endraw %}

files/hello.go.tpl

{% raw %}
```handlebars
package hello

import (
	"fmt"
)

// MAX_MESSAGE_LEN is the max allowed length for a message.
const MAX_MESSAGE_LEN = 22

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
{% endraw %}

files/hello_test.go.tpl

{% raw %}
```handlebars
package hello_test

import (
	"strings"
	"testing"

	"{{module_import_path}}/pkg/hello"
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
{% endraw %}


Initialize module and notify handler to update module requirements.
{% raw %}
```yml
- name: Initialize go module
  ansible.builtin.command:
    chdir: '{{ module_dir }}/{{ module_name }}'
    cmd: go mod init {{ module_import_path }}
    creates: go.mod
  notify: Update Module Reqs

handlers:
  - name: Update Module Reqs
    ansible.builtin.command:
      chdir: "{{ module_dir }}/{{ module_name }}"
      cmd: go mod tidy
      creates: go.sum
```
{% endraw %}

Assuming a directory structure like this containing the playbook and templates.

```
├── playbook.yml
└── files
    ├── main.go.tpl
    ├── hello.go.tpl
    ├── hello_test.go.tpl
    ├── Taskpaper.tpl.tpl
    └── .gitignore_base
```

Now we can set the playbook variables to values needed for a new module, and run
the playbook. In this case we're creating a module named `basic` initialized with the 
path `github.com/basic` located in the `~/github/examples/tmp` directory. The `clean_module` 
variable controls whether or not the `module_dir` is wiped before configuring the module,
this was mostly useful while I was testing the playbook.

```yml
vars:
  module_dir: ~/github/examples/tmp
  module_name: basic
  module_import_path: github.com/basic
  clean_module: false
```

```bash
$ ansible-playbook playbook.yml -v
```

As before we end up with a directory structure like this with the configured values:
```
.
├── .gitignore
├── Taskfile.yml
├── bin
│   └── basic
├── cmd
│   └── basic
│       └── main.go
├── go.mod
├── go.sum
└── pkg
    └── hello
        ├── hello.go
        └── hello_test.go
```

---

{% include refs.md %}

