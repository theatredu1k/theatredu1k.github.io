#https://programminghistorian.org/en/lessons/creating-and-viewing-html-files-with-python
f = open('helloworld.html','wb')

message = """<html>
<head></head>
<body><p>Hello World!</p></body>
</html>"""

f.write(message)
f.close()
