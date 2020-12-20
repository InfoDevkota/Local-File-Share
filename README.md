# Local File Share
Share file using local network

No kind of security implemented, thus use with in trusted network.

## How to use

- clone the repo.
- nevigate inside the project directory
- Install Dependencies ``` -> ```
 ```npm install```
- run the project ``` -> ```
 ```npm start``` 

check for your network IP.

```
ifconfig
```


then share you network IP:5010

Clients can connect on IP:5010 and starts sharing

Clients can upload the files as well as download.

## Why
I cannot find my pendrive to transfer the file from my another machine. Thus Here it is.

## Use Case.
- Could not find the pendrive.
- Where is the data cable?
- Take a quick snap from phone and pull it to PC.
- File from one machine to another.
- (8).rotate(90);

## Dependencies
- express
- ejs
- multer