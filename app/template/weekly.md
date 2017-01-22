### Weekly

{% for data in result %}

---
{% for item in data %}
- {{item.list}} - {{item.title}} **{{item.hours}}**{% endfor %}
{% endfor %}