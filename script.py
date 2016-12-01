from pyquery import PyQuery as pq
from lxml import etree
import urllib2
import sys
import cookielib
import urllib
import time
import smtplib
from email.mime.text import MIMEText
import copy
import json
import sys
reload(sys)
sys.setdefaultencoding('utf8')

#construct the cookie
cookie = cookielib.CookieJar()
opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cookie))
results = {}
urls = [
    'https://twitter.com/ABC/status/791723671089926145',
    'https://twitter.com/alyankovic/status/785164409286995968',
    'https://twitter.com/BarackObama/status/791315070588379136',
    'https://twitter.com/BBCSport/status/791733762694475778',
    'https://twitter.com/Bourdain/status/789270003870609408',
    'https://twitter.com/CBSNews/status/791610410545848320',
    'https://twitter.com/chuck_facts/status/790281734969561089',
    'https://twitter.com/CNN/status/791621727897980928',
    'https://twitter.com/donni/status/791494412484374528',
    'https://twitter.com/FoxNews/status/791558562233188353',
    'https://twitter.com/frugaltraveler/status/750035685562839040',
    'https://twitter.com/guardian/status/791742950489358336',
    'https://twitter.com/HillaryClinton/status/791718505297145857',
    'https://twitter.com/KimKardashian/status/782694393216110592',
    'https://twitter.com/Kristigirl2/status/755212432692260864',
    'https://twitter.com/latimestech/status/791285655280070656',
    'https://twitter.com/MaryEllaRegal/status/753745903907966976',
    'https://twitter.com/nbc/status/791698410441052160',
    'https://twitter.com/NYTScience/status/791723701645508608',
    'https://twitter.com/realDonaldTrump/status/791722658358439936',
    'https://twitter.com/ReutersTech/status/791673325206528000',
    'https://twitter.com/riledup2013/status/737472921476714496',
    'https://twitter.com/RobertDowneyJr/status/776857405363621888',
    'https://twitter.com/StephenAtHome/status/790914278060535808',
    'https://twitter.com/TheSunShowbiz/status/791717354849742848',
    'https://twitter.com/tnynews/status/790823219351658496',
    'https://twitter.com/washingtonpost/status/791666547479674880',
    'https://twitter.com/worldhum/status/763389550068510720',
    'https://twitter.com/WSJ/status/791587769256738816',
    'https://twitter.com/YahooSports/status/791658701715304448',
    'https://twitter.com/ABC/status/648628271014285312',
    'https://twitter.com/alyankovic/status/648926732616101888',
    'https://twitter.com/BarackObama/status/639906628356210688',
    'https://twitter.com/BBCSport/status/648994689002016769',
    'https://twitter.com/Bourdain/status/650841445008605184',
    'https://twitter.com/CBSNews/status/648550086289526784',
    'https://twitter.com/chuck_facts/status/654386348380581888',
    'https://twitter.com/CNN/status/648831253551161344',
    'https://twitter.com/donni/status/613933307470811136',
    'https://twitter.com/FoxNews/status/648955352990502912',
    'https://twitter.com/frugaltraveler/status/659685187530330113',
    'https://twitter.com/guardian/status/648983183975915521',
    'https://twitter.com/HillaryClinton/status/647837964832260096',
    'https://twitter.com/KimKardashian/status/648333583413739520',
    'https://twitter.com/Kristigirl2/status/592842531467096065',
    'https://twitter.com/latimestech/status/646749399461298176',
    'https://twitter.com/MaryEllaRegal/status/584202235850186752',
    'https://twitter.com/nbc/status/648635357114687488',
    'https://twitter.com/NYTScience/status/648624714559135744',
    'https://twitter.com/realDonaldTrump/status/648522896193810432',
    'https://twitter.com/ReutersTech/status/648982357433827329',
    'https://twitter.com/riledup2013/status/452888407698845696',
    'https://twitter.com/RobertDowneyJr/status/593816837554573312',
    'https://twitter.com/StephenAtHome/status/647889820077977600',
    'https://twitter.com/TheSunShowbiz/status/648949116916080640',
    'https://twitter.com/tnynews/status/634062207681175552',
    'https://twitter.com/washingtonpost/status/648339511521505281',
    'https://twitter.com/worldhum/status/637656427297771520',
    'https://twitter.com/WSJ/status/647742170657648640',
    'https://twitter.com/YahooSports/status/648857016253984768',
]

for idx, url in enumerate(urls):
    response = opener.open(url)
    raw_data = pq(response.read())
    dic = {}
    dic['id'] = idx
    dic['avatar'] = raw_data('.permalink-header .avatar').attr('src')
    raw_full_name = raw_data('.permalink-header strong').text()
    dic['full_name'] = raw_full_name[:raw_full_name.find('Verified account')]
    dic['username'] = raw_data('.permalink-header .username').text().replace(' ', '', 1)
    dic['tweet_link'] = raw_data('.permalink-tweet .js-display-url').text()
    dic['tweet_text'] =  raw_data('.permalink-tweet .js-tweet-text').remove('a').text()
    dic['retweets'] = raw_data('.js-stat-retweets strong').text().replace(',', '')
    dic['likes'] = raw_data('.js-stat-favorites strong').text().replace(',', '')
    dic['date'] = raw_data('.client-and-actions span').text()
    results[str(idx)] = dic

with open('data.json', 'w') as outfile:
    json.dump(results, outfile)
