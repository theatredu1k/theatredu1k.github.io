import random
import tracery #grammar generator
import json
import secrets #hexadecimal generator
import requests # get url and data from JSON
import re #manipulate strings
import datetime
from nltk.tag import pos_tag

adj_data = json.loads(open("dataset/adjs.json").read())
adj_list = adj_data["adjs"]
mood_data = json.loads(open("dataset/moods.json").read())
moods = mood_data["moods"] # I had to look at the JSON data itself to determine that this was the correct key!
body_data = json.loads(open("dataset/bodyParts.json").read())
body = body_data["bodyParts"]
code_verbs_data = json.loads(open("dataset/code_verbs.json").read())#created a json file with usual verbs in coding environment
code_verb = code_verbs_data["common_verbs"]
verbs_data = json.loads(open("dataset/verbs.json").read())
verbs = verbs_data["verbs"]
tarot_data = json.loads(open("dataset/tarot_interpretations.json").read())
cards = tarot_data["tarot_interpretations"]
newTech_data = json.loads(open("dataset/new_technologies.json").read())
newTech = newTech_data["technologies"]
motor = ["DC motor","servo","sensor"]

#the source text from the textgenrnn generator Max Woolf
source_txt= [line.strip() for line in open("dataset/nodeMaskText.txt")]
#len(source_txt)
sentences=[]

#objects.json from Corpora with addition of specific vocab from nodeMaskText

objects_data = json.loads(open("dataset/objects.json").read())
object_list = objects_data["objects"]

#CREATE THE STORY

#0-Sentence, in the "tech environment", the nodetext happens
#take a random sentence from the source text and add a context environment from newTechnologies corpus in Corpora
sentence = "In the " + newTech[random.randint(0,len(newTech)-1)]+", "+source_txt[random.randint(0,len(source_txt)-1)]
sentences.insert(0,sentence)
print(sentence)
