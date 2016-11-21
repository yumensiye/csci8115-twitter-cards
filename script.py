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
    'https://twitter.com/BBCSport/status/791733762694475778',
    'https://twitter.com/NYTScience/status/791723701645508608',
    'https://twitter.com/ReutersTech/status/791673325206528000',
    'https://twitter.com/CBSNews/status/791610410545848320',
    'https://twitter.com/WSJ/status/791587769256738816',
    'https://twitter.com/StephenAtHome/status/790914278060535808',
    'https://twitter.com/KimKardashian/status/782694393216110592',
    'https://twitter.com/chuck_facts/status/790281734969561089',
    'https://twitter.com/riledup2013/status/737472921476714496',
    'https://twitter.com/ABC/status/648628271014285312',
    'https://twitter.com/TheSunShowbiz/status/648949116916080640',
    'https://twitter.com/washingtonpost/status/648339511521505281',
    'https://twitter.com/NYTScience/status/648624714559135744',
    'https://twitter.com/latimestech/status/646749399461298176',
    'https://twitter.com/CBSNews/status/648550086289526784',
    'https://twitter.com/FoxNews/status/648955352990502912',
    'https://twitter.com/tnynews/status/634062207681175552',
    'https://twitter.com/donni/status/613933307470811136',
    'https://twitter.com/frugaltraveler/status/659685187530330113',
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
    dic['retweets'] = raw_data('.js-stat-retweets strong').text()
    dic['likes'] = raw_data('.js-stat-favorites strong').text()
    dic['date'] = raw_data('.client-and-actions span').text()
    results[str(idx)] = dic

with open('data.json', 'w') as outfile:
    json.dump(results, outfile)
