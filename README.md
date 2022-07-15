# nalo_tech_backend
 This is the backend code for the assignment given.
 
 The database used for this project is Mysql, and the framework used for this backend is the express framework based off Nodejs.
 
 The sql database name as per this project is "nalo_tech", host being "localhost", user being "root". for the password, do specify the pasword of the user you have used for the database. You can also change the detils to fit you setup system.
 
There should be only one table in the database, the "phonenumbers" table as shown below<br/>
+---------------------+<br/>
| Tables_in_nalo_tech |<br/>
+---------------------+<br/>
| phonenumbers        |<br/>
+---------------------+<br/>
 
 the attributes of the table,"phonenumbers", are also show below<br/>
 +-------------+--------------+------+-----+---------+----------------+<br/>
| Field       | Type         | Null | Key | Default | Extra          |<br/>
+-------------+--------------+------+-----+---------+----------------+<br/>
| NumberID    | int          | NO   | PRI | NULL    | auto_increment |<br/>
| PhoneNumber | varchar(20)  | NO   |     | NULL    |                |<br/>
| UserName    | varchar(255) | NO   |     | NULL    |                |<br/>
+-------------+--------------+------+-----+---------+----------------+<br/>

 #REQUEST INPUTS AND OUTPUTS
 
 '/createNewPhoneNumber': This is a post request which will require you to send 2 values with names, "phoneNumber" and "userName". If the values are successfully received and processed, a string with status 201 is returned. if not an err message with status 422 is sent. The front end should ensure that user does not send empty or invalid fields.
 
 '/deletePhoneNumber': This is a delete request which receives data, the id of the phone number, by the name "phoneNumberID".If the values are successfully received and processed, a string with status 200 is returned. if not an err message with status 422 is sent. The front end should ensure that user does not send empty or invalid fields.
 
 '/fetchPhoneNumber': This is a get request which receives data, request parameter with the id of the phone number, by the name "phoneNumberID". If the values are successfully received and processed, a string of the users phone number with status 200 is returned. if not an err message with status 422 is sent. The front end should ensure that user does not send empty or invalid fields.
 
'/editNumber': This is a post request which will require you to send 2 values with names, "oldNumber" and "newNumber", with oldNumber being the number to be edited and newNumber being the edited number. If the number doesn exist, a string is returned indicating this. If the values are successfully received and processed, a string with status 200 is returned. if not an err message with status 422 is sent. The front end should ensure that user does not send empty or invalid fields.

'/addCSVNumbers': This is a post request which requires the file to be sent in the multipart form. This is then received and processed. Ensure that the first line of the csv file is as follows, "PhoneNumber, UserName", with the remaining portions of the file following the same sequence with the phone number coming first then the username. If the values are successfully received and processed, a string with status 200 is returned. Else an error string is returned.

 '/getAllPhoneNumbers': This is a get request which receives data, request parameter with the curernt page number, by the name "page". If the values are successfully received and processed, a dictionary with two key values,"result" and "totalNumberOfPages" are returned. if not an err message is sent. The front end should ensure that user does not send empty or invalid fields.


 
 
