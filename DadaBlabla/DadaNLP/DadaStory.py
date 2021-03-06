import random
import tracery #grammar generator
import json
import secrets #hexadecimal generator
import requests # get url and data from JSON
import re #manipulate strings
import datetime
from nltk.tag import pos_tag


#import json files we need to create the story
#when json files is a simple list, we can have random use of it in the rules of  tracery grammar settings
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


#1 and 2 Sentence set the mood , give an advice
#retrieve the NLTK tags
tagged_sent = pos_tag(sentence.split())
#check if we have nouns singular or plural
pluralnouns = [word for word,pos in tagged_sent if (pos == 'NNS')] # looking for noun plural
singnouns = [word for word,pos in tagged_sent if (pos == 'NN')] # looking for noun singular

# write a dialogue based on the nouns we have from the random sentence taken from the source text
if len(pluralnouns)!=0:
    noun = random.choice(pluralnouns)
    # set the mood of the noun -1
    sentence = "The " + noun + " are " + random.choice(moods)
    sentences.insert(1,sentence)
    print(sentence)
    #print("The " + noun + " are " + random.choice(moods))
    #say hello

elif len(singnouns)!=0:
    noun = random.choice(singnouns)
    sentence = "The " + noun + " of the " + random.choice(motor)+" is " + random.choice(moods)
    sentences.insert(1,sentence)
    #sentences.insert(2,"")
    print(sentence)

elif (len(singnouns)==0 &len(pluralnouns)==0): # if no noun found in the nodeMaskText, set the noun to the "codes"
    noun = "codes"

rules = {
      "origin": ["#greeting#, #noun#! we are the #characters#s on your #bodypart# "],
    "greeting": ["Howdy", "Hello", "Greetings", "What's up", "Hey", "Hi"],
    "farewell":["Bye","Ciao","See ya","Salut","Kiss","XOXO"],
    "noun": noun,
    "characters": ["node","paranode","mask","puppet","network","computer"],
    "bodypart" : body
    }

grammar = tracery.Grammar(rules) # just one sentence:
sentence = grammar.flatten("#origin#")
sentences.insert(2,sentence)
#print("The " + noun + " of the " + random.choice(motor)+" is " + random.choice(moods))

print(sentence)

#3-sentence
  #give an order
tense ='present'
sentence = random.choice(verbs)[tense].capitalize() +" the "+ random.choice(body)+ "!"
sentences.insert(3,sentence)
print (sentence)

#4  hexa message code for a node telling the proverb of the day
proverbs_data = json.loads(open("dataset/proverbs.json").read())
proverb = proverbs_data["proverbs"]
#create the list of keys from the dictionary of proverbs
newlist =[]

for i in range(len(proverb)):
   for item in proverb[i].keys():
     newlist.append(item)
theme=random.choice(newlist)
from collections import defaultdict
newdict=  defaultdict(list)
for i in range(len(newlist)):
    newdict[i]=(newlist[i])

#choose random number, to select the the key , in dictionary of themes,
#choose random sentence from the proverbs in the theme
p = random.randint(0,len(proverb)-1)
listnum= [3,5,7,8,13]
#p = random.choice(listnum)
s = random.randint(0,len(proverb[p][newdict[p]])-1)
h = secrets.token_hex(3)
prov= proverb[p][newdict[p]][s]
prov = re.sub("\.", " ", prov) #take off the "\." to avoid reading this
#print( str(num)  + letter+" for the "+noun+","+prov )
# message for one indexed node
sentence4 = h + "  for the node "+ noun +". "+ prov.capitalize()
sentences.insert(4,sentence4)
print(sentence4.capitalize(),sentence4)

#print( h +" for the "+noun+". "+"\n"+prov )

#5 and 6-sentence with Tracery grammar generator
#statement , the challenge
statement_rules = {
    "origin": ["The #analog# look like #adjective# #object#s "],
    "greeting": [ "What's up", "Hey", "Hi", "Oops", "OMG"],

    "analog": ["animals", "humans", "plants","cells","protists","fungis","trees","buildings"],

    "codeVerb":code_verb,
    "noun": noun,
    "adjective":random.choice(adj_list),
    "bodypart" : body,
    "object": random.choice(object_list)
    }

#decision , the solution
decision_rules = {
    "origin": ["The #digital# will #codeVerb# their #adjective# #characters# "],
    "noun": noun,
    "object": random.choice(object_list),
    "digital": [ "blobs","particles","rectangles","vertices","triangles","ellipses","circles","meshes","lines","files","folders"],
    "codeVerb":code_verb,
    "characters": ["nodes","paranode","mask","puppet","network","computers","processor","A P I ","I D E","interface","Javascript","Processing","OpenFrameworks","Stackoverflow","Atom","Github"],
    "adjective":random.choice(adj_list),
      }
statement_grammar = tracery.Grammar(statement_rules)
decision_grammar = tracery.Grammar(decision_rules)

sentence5 = statement_grammar.flatten("#origin#")
sentence6 = decision_grammar.flatten("#origin#")
sentences.insert(5,sentence5)
sentences.insert(6,sentence6)
print (sentence5,sentence6)
#print( statement_grammar.flatten("#origin#"),decision_grammar.flatten("#origin#"))


#write the sentences in a file "dadaPoem.txt" for the nodes to read outloud
output = open("dataset/dadaPoem.txt", "a")
for a in range(0,len(sentences)):
        output.write(sentences[a])
        output.write("\n")
output.close()
d = datetime.datetime.today()
nameFile = d.strftime('%d-%Y')
nameFile = "dataset/dadaDay.txt"
output = open(nameFile, "w")
#trunk the poem for twitter
for a in range(0,len(sentences)-2):
        output.write(sentences[a])
        output.write("\n")
output.close()

#uncomment to check the poem
#sentences
