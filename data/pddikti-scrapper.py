from pddiktipy import api
from pprint import pprint as p
import json
import requests
a = api()

result = a.search_all('PELITA BANGSA')
jsondumps = json.dumps(result)

r = requests.post('http://localhost:80/pemwebuts/mahasiswa', data=jsondumps)
print(r)
print(jsondumps)