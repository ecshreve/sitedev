{% assign tool_data = site.data.tools[include.tool] %}
> {{ tool_data.ref }}

[{{ tool_data.name }} Home]({{ tool_data.home }}) • [{{ tool_data.name }} Docs]({{ tool_data.docs }})