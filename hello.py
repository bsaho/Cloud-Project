#!/usr/bin/env python
from flask import Flask
from flask import render_template
from flask import jsonify
from flask import request
import urllib.request
from flask import Flask, request, abort
import json
import codecs
# import MySQLdb
import hashlib
import re
import sys  
import pymysql




def sqlQuery (query):
	db2= pymysql.connect(host='xxxxx',database='cloudproject',user='XXXXXX',password='XXXXXXX', port=3306)
	cur2=db2.cursor ()

	try:
		cur2.execute (query)
	except pymysql.MySQLError as e:
	    print('Got error {!r}, errno is {}'.format(e, e.args[0]))
	result = cur2.fetchall ()
	db2.commit ()
	cur2.close ()
	db2.close ()
	return result


def sqlQuery2 (query, query2):
	db2= pymysql.connect(host='xxxxx',database='cloudproject',user='xxxxx',password='xxxxx', port=3306)
	cur2=db2.cursor ()

	try:
		cur2.execute (query, query2)
	except pymysql.MySQLError as e:
	    print('Got error {!r}, errno is {}'.format(e, e.args[0]))
	result = cur2.fetchall ()
	
	db2.commit ()
	cur2.close ()
	db2.close ()
	return result
	

cur2=db.cursor ()



try:
	cur2.execute ("CREATE database cloudproject;")
except pymysql.MySQLError as e:
    print('Got error {!r}, errno is {}'.format(e, e.args[0]))


queryDB= """CREATE TABLE IF NOT EXISTS queryDB(
    searchString VARCHAR (30) NOT NULL,
    readStatus VARCHAR(30) NOT NULL"""
try:
    cur2.execute (queryDB)
    print ("Success")
except pymysql.MySQLError as e:
    print('Got error {!r}, errno is {}'.format(e, e.args[0]))


searchDB= """CREATE TABLE IF NOT EXISTS searchDB(
    searchString VARCHAR (30) NOT NULL,
    readStatus VARCHAR(30) NOT NULL,
    pureJSON TEXT NOT NULL)"""
try:
    cur2.execute (searchDB)
    print ("Success")
except pymysql.MySQLError as e:
    print('Got error {!r}, errno is {}'.format(e, e.args[0]))

picDB= """CREATE TABLE IF NOT EXISTS picDB(
    searchString VARCHAR (30) NOT NULL,
    readStatus VARCHAR (30) NOT NULL,
    pureJSON TEXT NOT NULL)"""
try:
    cur2.execute (picDB)
    print ("Success")
except pymysql.MySQLError as e:
    print('Got error {!r}, errno is {}'.format(e, e.args[0]))

cur2.close ()
db.close ()


shelffURL="https://www.goodreads.com/book/review_counts.json?isbns="
shelffURL2="&key=bLh1UjYGmbHP4cdbCWGyIg"
shelfURL="https://www.goodreads.com/book/isbn?&format=json&isbn="
shelfURL2="&user_id=19574855&key=bLh1UjYGmbHP4cdbCWGyIg"
bestURL="http://api.nytimes.com/svc/books/v3/lists/"
bestURL2=".json?sort-by=weeks-on-list&sort-order=DESC&api-key=XXXXXX"
bestSearch="http://api.nytimes.com/svc/books/v3/lists/names.json?api-key=XXXXXX"

listNames="http://api.nytimes.com/svc/books/v3/lists/names.json?api-key=XXXXXX"

template="https://www.goodreads.com/book/review_counts.json?isbns=0812993543&key=bLh1UjYGmbHP4cdbCWGyIg"
booksURL="https://api.nytimes.com/svc/books/v3/reviews.json?isbn="
bookKey="&api-key=" + "VFJAYlfMuj1AYhZG5LUOMZs5FjktVrMZ"

#code and concepts sourced from template provided by G. Klotz
query2='bats'
nytKey='VFJAYlfMuj1AYhZG5LUOMZs5FjktVrMZ'
query= 'romney'
pureUrl='http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=' 
url='http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=' + query2 +'&page=0&sort=newest&api-key=' +nytKey


googleSearch="https://www.googleapis.com/books/v1/volumes?q="
googleSearch2="&maxResults=1&key=XXXXXX"
googleSearch3="&maxResults=15&key=XXXXXX"

app = Flask(__name__, static_url_path='')



@app.route ('/bsearch')
def booksearch ():
	return app.send_static_file ('booksearch.html')

@app.route('/reviews')
def reviews():
     return app.send_static_file('bookreview.html')


@app.route('/shelf')
def shelf():
     return app.send_static_file('bookshelf.html')


@app.route('/bestsellers')
def bestsellers():
     return app.send_static_file('bestseller.html')


@app.route('/articles')
def articles():
     return app.send_static_file('article.html')


@app.route('/')
def index():
     return app.send_static_file('superhero.htm')

@app.route ('/static')
def staticJSON ():
	return app.send_static_file ('sampleJSON.js')


@app.route('/<resource>', methods=['GET', 'PUT', 'POST', 'DELETE'])
def show_resource(resource):

	if resource == "data":
		if request.method == 'GET':
			userInput = request.form['userInput']
			searchUrl=pureUrl + userInput + '&page=0&sort=newest&api-key=' +nytKey
			response = urllib.request.urlopen(searchUrl)
			content=response.read ()
			print (content)
			# return "GET: listing entries available at /data"
			return content
		elif request.method == 'PUT':

			userInput=request.form['userInput']
		
			searchUrl=pureUrl + userInput + '&page=0&sort=newest&api-key=' +nytKey
			response = urllib.request.urlopen(searchUrl)
			content=response.read ()
			jsonBalls= json.loads (content)

			return jsonify (jsonBalls)

		else:
			abort(404)
	elif resource=="wipe":
		if request.method=="PUT":
			print ("Wiping everything")

			delSearchDB= "TRUNCATE TABLE   searchDB"
			try:
				sqlQuery (delSearchDB)
				# cur = db.cursor()
				# cur.execute (delSearchDB)
				# cur.close()


				print ("Success")
			except pymysql.MySQLError as e:
			    print('Got error {!r}, errno is {}'.format(e, e.args[0]))

			delPicDB= "TRUNCATE TABLE   picDB"
			try:
				sqlQuery (delPicDB)
				print ("Success")
			except pymysql.MySQLError as e:
			    print('Got error {!r}, errno is {}'.format(e, e.args[0]))
			searchDB= """CREATE TABLE IF NOT EXISTS searchDB(
			    searchString VARCHAR (30) NOT NULL,
			    readStatus VARCHAR (30) NOT NULL,

			    pureJSON TEXT NOT NULL)"""
			

			return ("Done")

	elif resource=="cookie":
		if request.method =="GET":
			cookieValue=request.form ['cookieVal']
			print (cookieValue)
			return (cookieValue)
		elif request.method=="PUT":
			cookieValue=request.form['cookieVal']
			cookieHash=hashlib.sha256 (cookieValue.encode('utf-8'))
			RMinCookie=hashlib.sha256("969bg=red; 969TAExplanations=false; 969BasicExpl=false; 969Pointless=false".encode('utf-8'))
			BMarkCookie=hashlib.sha256 ("969bg=black; 969TAExplanations=true; 969BasicExpl=true; 969Pointless=true".encode('utf-8'))
			RMarkCookie=hashlib.sha256("969bg=red; 969TAExplanations=true; 969BasicExpl=true; 969Pointless=true".encode('utf-8'))
			BMinCookie=hashlib.sha256 ("969bg=black; 969TAExplanations=false; 969BasicExpl=false; 969Pointless=false".encode('utf-8'))
			if RMinCookie.hexdigest ()==cookieHash.hexdigest ():
				#print ("Match in: " + cookieHash.digest ())
				return (cookieValue)
			elif BMinCookie.hexdigest ()==cookieHash.hexdigest ():
				#print ("Match in: " + cookieHash.digest ())
				return (cookieValue)
			elif RMarkCookie.hexdigest ()==cookieHash.hexdigest ():
				#print ("Match in: " + cookieHash.digest ())
				return (cookieValue)

			elif BMarkCookie.hexdigest ()==cookieHash.hexdigest ():
				#print ("Match in: " + cookieHash.digest ())
				return (cookieValue)

			else:
				return ("pass=FAIL")

	elif resource=="reviewquery":
		if request.method=="PUT":
			userInput=request.form['userInput']
		
			searchUrl=booksURL + userInput + bookKey

			response = urllib.request.urlopen(searchUrl)
			content=response.read ()
			
			jsonBalls= json.loads (content)
			return jsonify (jsonBalls)
	elif resource=="shelfdelete":
		if request.method=="PUT":
			userInput=request.form['userInput']
			print ("Shelf delete" + userInput)
			sqlQuery2 ("DELETE FROM searchDB where searchString=%s", (userInput,))
			
			return "done"
	elif resource=="picdelete":
		if request.method=="PUT":
			userInput=request.form['userInput']
			print ("Pic delete " + userInput)
			sqlQuery2 ("DELETE  FROM picDB where searchString=%s", (userInput,))

			
			
			return "done"

	elif resource=="bestlist":
		if request.method=="PUT":
			userInput=request.form['userInput']
			print (userInput)
			# searchUrl=booksURL + userInput + bookKey
			searchString=bestURL + userInput + bestURL2
			response = urllib.request.urlopen(searchString)
			content=response.read ()
			jsonBalls= json.loads (content)
			return jsonify (jsonBalls)
	elif resource=="shelfquery":
		
		if request.method=="PUT":
			userInput=request.form['userInput']
			print ("Shelf " + userInput)
				
			picQueryResult= sqlQuery ("SELECT * FROM picDB")
			for i in picQueryResult:
				if i is not None:
					value=i[0]
					searchTerm=value
					# print ("searchDB|")
					# print (searchTerm)

			validInput=True
				# searchFind= ("SELECT searchString,pureJSON FROM nytDB where searchString LIKE %s")
				# searchVal= user
			if ("searchString" not in userInput and "searchDB" not in userInput and "DROP TABLE" not in userInput
				and "DELETE " not in userInput and "pureJSON" not in userInput and "*" not in userInput):
					
				# cur.execute ("SELECT * FROM searchDB WHERE readStatus LIKE %s", [userInput])
				result= sqlQuery2 ("SELECT searchString,pureJSON FROM searchDB where searchString LIKE %s", userInput)

				

				
				
			else:
				validInput=False

			print ("Row count ")
			# print (cur.rowcount)
			if len (result)<=0:
				searchUrl=shelffURL + userInput + shelffURL2
				response = urllib.request.urlopen(searchUrl)
				content=response.read ()

				jsonBalls= json.loads (content)
				if ("searchString" not in userInput and "searchDB" not in userInput and "DROP TABLE" not in userInput
					and "DELETE " not in userInput and "pureJSON" not in userInput and "*" not in userInput):
						
					# cur.execute ("SELECT * FROM searchDB WHERE readStatus LIKE %s", [userInput])
					sqlQuery2 ("INSERT IGNORE INTO searchDB (searchString,pureJSON,readStatus) VALUES (%s,%s,%s)" ,(userInput,content,"unread"))

				
				else:
					print ("Invalid syntax, blocked to avoid SQL Injection")
					validInput=False
				
					


				return jsonify (jsonBalls)
			elif len (result)>0 and validInput==True:
				value=result [0]
				if value is not None:
					searchStringValue=value [0]
					jsonValue= value[1]
				# print ("Getting from searchDB")
				# print (searchStringValue)
					jsonValue2=json.loads (jsonValue)
					# print (jsonValue)
					return jsonify (jsonValue2)
			else:
				return "Error"

		

			# searchUrl=booksURL + userInput + bookKey
			# searchString=shelffURL + userInput + shelffURL2
			# response = urllib2.urlopen(searchString)
			# content=response
			# print (content)
			# jsonBalls= json.loads (content)
			# return jsonify (jsonBalls)
	elif resource=="relatedBooks":
		if request.method =="PUT":
			userInput=request.form['userInput']
			print (userInput)
			searchUrl="https://www.googleapis.com/books/v1/volumes/" + userInput + "/associated?key=AIzaSyCdUhw5de7WfRKMpcwyeRvDbxdxQDpfiK8"
			response = urllib.request.urlopen(searchUrl)
			content=response.read ()

			jsonBalls= json.loads (content)
			return jsonify (jsonBalls)

	elif resource=="picquery":
		if request.method=="PUT":
			userInput=request.form['userInput']
			result =sqlQuery ("SELECT * FROM picDB")
			for i in range (len (result)):
				value=result [i]
				searchTerm=value [0]
				# print ("|")
				# print (searchTerm)

			validInput=True
			# print (userInput)
			if ("searchString" not in userInput and "picDB" not in userInput and "DROP TABLE" not in userInput
				and "DELETE " not in userInput and "pureJSON" not in userInput and "*" not in userInput):
				result=sqlQuery2 ("SELECT searchString,pureJSON FROM picDB where searchString LIKE %s", userInput)
			else:
				validInput=False
			if len (result)<=0:
				searchUrl=googleSearch + userInput + googleSearch2
				response = urllib.request.urlopen(searchUrl)
				content=response.read ()

				jsonBalls= json.loads (content)
				if ("searchString" not in userInput and "picDB" not in userInput and "DROP TABLE" not in userInput
					and "DELETE " not in userInput and "pureJSON" not in userInput and "*" not in userInput):
					sqlQuery2 ("INSERT IGNORE INTO picDB (searchString,pureJSON,readStatus) VALUES (%s,%s,%s)",(userInput,content,"unread"))
					
				else:
					print ("Invalid syntax, blocked to avoid SQL Injection")
					validInput=False
				
					


				return jsonify (jsonBalls)
			elif len (result)>0 and validInput==True:
				value=result [0]
				searchStringValue=value [0]
				jsonValue= value[1]
				# print ("Getting from DB")
				# print (searchStringValue)
				jsonValue2=json.loads (jsonValue)
				# print ("Pic query")
				# print (jsonValue)
				return jsonify (jsonValue2)
			else:
				return "Error"

	elif resource=="googlequery":
		if request.method=="PUT":
			userInput=request.form['userInput']
			searchUrl=googleSearch + userInput + googleSearch3
			response = urllib.request.urlopen(searchUrl)
			content=response.read ()
			jsonBalls= json.loads (content)
			return jsonify (jsonBalls)
	


			# # searchUrl=booksURL + userInput + bookKey
			# searchString=googleSearch + userInput + googleSearch2

			# response = urllib2.urlopen(searchString)
			# content=response
			# print (content)
			# jsonBalls= json.loads (content)
			# return jsonify (jsonBalls)



	elif resource=="allShelf":
		print ("All Shelf")
		

		if request.method=="PUT":
				isbnString=''
				userInput=request.form['userInput']
				print ("All shelf " + userInput)
						
					
				if userInput=='read':
						
					result = sqlQuery2 ("SELECT * FROM searchDB WHERE readStatus LIKE %s", userInput)


					for i in range (len (result)):
						value=result [i]
						if value is not None:
							searchTerm=value [0]
							isbnString=isbnString + str (searchTerm) + ";"
					print ("printing read")
					print (isbnString)

					return (isbnString)

				elif userInput=='reading':
					
					result=sqlQuery2 ("SELECT * FROM searchDB WHERE readStatus LIKE %s", userInput)

					

					for i in range (len (result)):
						value= result [i]
						if value is not None:
							searchTerm=value [0]
							isbnString=isbnString + str (searchTerm) + ";"
					print ("printing reading")
					print (isbnString)
					return isbnString

				elif userInput=='unread':
					print ("finding unread")
					try:
							
						result=sqlQuery2 ("SELECT * FROM searchDB WHERE readStatus LIKE %s", userInput)
						for i in range (len (result)):
							value= result [i]
							if value is not None:
								searchTerm=value [0]
								isbnString=isbnString + str (searchTerm) + ";"
						return isbnString


					except pymysql.MySQLError as e:
						print('Got error {!r}, errno is {}'.format(e, e.args[0]))
						return "Error"

					print ("finding unread")
					print ("printing unread")
					print (isbnString)

					
				else:
					print ("selecting all")
					
					try:
						
						result=sqlQuery ("SELECT * FROM searchDB")
						for i in range (len (result)):
							value=result [i]
							if value is not None:
								searchTerm=value [0]
								isbnString=isbnString + str (searchTerm) + ";"
						return isbnString
						

					except pymysql.MySQLError as e:
						print('Got error {!r}, errno is {}'.format(e, e.args[0]))
						return "Error"
					
					# print ("printing all")
					# print (isbnString)

					# print ("Lol")
					# # return '9781555846879'
					# resultt = cur.fetchall()
					# print (resultt)
					# for i in resultt:
					# 	print (i)
					# 	if i is not None:
					# 		searchTerm=i [0]
					# 		isbnString=isbnString + str (searchTerm) + ";"

					# print ("printing all")
					# print ("|" + isbnString + '|')

					# return isbnString
		else:
			return "Error"


	elif resource=="readadd":
		if request.method=="PUT":
			userInput=request.form['userInput']
			print (userInput)
			sqlQuery2 ('UPDATE picDB SET readStatus=\'read\' WHERE searchString LIKE %s',userInput)
			sqlQuery2 ('UPDATE searchDB SET readStatus=\'read\' WHERE searchString LIKE %s',userInput)

		return "done"

	elif resource=="readingadd":
		if request.method=="PUT":
			userInput=request.form['userInput']
			sqlQuery2 ('UPDATE picDB SET readStatus=\'reading\' WHERE searchString LIKE %s',userInput)
			sqlQuery2 ('UPDATE searchDB SET readStatus=\'reading\' WHERE searchString LIKE %s',userInput)

		return "done"
	elif resource=="unreadadd":
		if request.method=="PUT":
			userInput=request.form['userInput']
			sqlQuery2 ('UPDATE picDB SET readStatus=\'unread\' WHERE searchString LIKE %s',userInput)
			sqlQuery2 ('UPDATE searchDB SET readStatus=\'unread\' WHERE searchString LIKE %s',userInput)

		return "done"

	elif resource=="counter":
		if request.method=="PUT":
			countString=''
			sizeDB=0
			try:
					
				result= sqlQuery ("SELECT * FROM searchDB;")
				sizeDB=len (result )

			except pymysql.MySQLError as e:
				print('Got error {!r}, errno is {}'.format(e, e.args[0]))
				print ("Counter error 1 ")
				return "0;0;0"
			
			
			# print ("searchDb")
			# print (sizeDB)

			try:
					
				result =sqlQuery ("SELECT * FROM picDB;")
				sizeDB=len (result)
				# print (sizeDB)
				countString=countString  + str (sizeDB) +";"
				# cur.close()

			except pymysql.MySQLError as e:
				print('Got error {!r}, errno is {}'.format(e, e.args[0]))
				print ("Counter error 2")
				return "0;0;0"
			
			
			try:
				result =sqlQuery2 ("SELECT * FROM  picDB WHERE readStatus LIKE %s;","read")
				sizeDB=len (result)
				countString=countString  + str (sizeDB) +";"

				# cur.close()

				# cur.execute ('SELECT * FROM  picDB WHERE readStatus LIKE %s;',["read"])
			except pymysql.MySQLError as e:
				print('Got error {!r}, errno is {}'.format(e, e.args[0]))
				print ("Counter error 3 ")
				return "0;0;0"
			
			

			try:
				result=sqlQuery2 ("SELECT * FROM  picDB WHERE readStatus LIKE %s;","reading")
				sizeDB=len (result)
				countString=countString  + str (sizeDB) +";"



				# cur.execute ('SELECT * FROM  picDB WHERE readStatus LIKE %s;',["reading"])
			except pymysql.MySQLError as e:
				print('Got error {!r}, errno is {}'.format(e, e.args[0]))
				print ("Counter error 4 ")
				return "0;0;0"
			
			try:
				sqlQuery2 ("SELECT * FROM  picDB WHERE readStatus LIKE %s;","unread")
				sizeDB=len (result)
				countString=countString  + str (sizeDB) +";"

			except pymysql.MySQLError as e:
				print('Got error {!r}, errno is {}'.format(e, e.args[0]))
				print ("Counter error 5")
				return "0;0;0"
			return str (countString)



	# elif resource=="delete":
	# 	if request.method=="PUT":
	# 		userInput=request.form['userInput']
	# 		sqlQuery("DELETE * FROM picDB WHERE searchString=?", (userInput,))
	# 		sqlQuery("DELETE * FROM searchDB WHERE searchString=?", (userInput,))

	# 		return "passed"





	else:
		abort(404)


if __name__ == '__main__':
    app.run(host="0.0.0.0")
    # app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
