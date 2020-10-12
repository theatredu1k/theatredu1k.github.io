from pyp5js import *


from IPython.display import display, HTML
def show_html(src):
    return display(HTML(src), metadata=dict(isolated=True))

html_src = """
<body>
<p style="height: 240px; background-image: url(https://i.giphy.com/media/OmK8lulOMQ9XO/giphy-downsized.gif);"> hello</h1>
</body>
</html>
"""
show_html(html_src)
