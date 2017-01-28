### Report {{startDate}} - {{endDate}}

{% for list in data %}

---
{% for item in list %}
- {{item.list}} - {{item.title}} **{{item.hours}}**{% endfor %}
{% endfor %}