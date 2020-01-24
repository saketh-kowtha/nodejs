# Nodejs Practice problems

Implementation of 
  1.  Stack
  2.  Queue
  3.  Linked List
  4.  Dequeue
  5.  Ordered List
  6.  UnOrdered List
  7.  Bubble Sort
  8.  Insertion Sort
  10. Hashtable
  11. Anagram
  12. Prime Numbers
  13. Command Line Calender (unix cal command implementation in nodejs)
  14. AddressBook Application
  15. Clinical Management System etc...

# Usage 
To Run Main programs 
```
cd REPO
node UtilMain.js
```
To Run Core (Data Structure) programs
```
cd REPO/Core/
npm FILE_NAME
```
To Run Address Book
```
cd REPO/Core/AddressBook
node AddressBookMain.js
```
To Run Clinical Management System
```
 cd REPO/Core/ClinicManagement
 node Main.js
```

# Using Docker
```
sudo docker build -t custom_image_name . 
#list of programs
sudo docker run -it custom_image_name ls /home/Node
#Running program
sudo docker run -it custom_image_name node ./home/Node/programe_name
```
Note : For Clinical Management System need to install node_modules. Please use ```npm i or npm install``` to Download
