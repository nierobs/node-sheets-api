# Technical Challenge with Node.js and Google Sheets API

**Author:** Robson Niemeyer  
**Repository:** [https://github.com/nierobs/node-sheets-api](https://github.com/nierobs/node-sheets-api)  
**Spreadsheet URL:** [https://docs.google.com/spreadsheets/d/1YPe4FgWX88SOKu4lDCKe0G3NyhsNzmzMkMf1wP5ZRVs/edit](https://docs.google.com/spreadsheets/d/1YPe4FgWX88SOKu4lDCKe0G3NyhsNzmzMkMf1wP5ZRVs/edit)

## Beginner's guide

### 1. Share your spreadsheet

Click Share and select Anyone with the link > Editor

### 2. Enable the Google Sheets API

Instructions at [https://support.google.com/googleapi/answer/6158841](https://support.google.com/googleapi/answer/6158841)

### 3. Deploy the Google Apps Script

- In your spreadsheet, click Extensions > Apps Script    
- Add a new Apps Script file and copy the contents of the file located at ./external_resources/script.gs, changing the spreadsheetId as needed  
- Add a new Google Sheets API service  
- Click Deploy > New deployment and allow access for Anyone  
- Click Run and allow access as needed

### 4. Build and start containers

```bash
$ docker compose up -d
```

- Your spreadsheet should now be updated  
- However, you can read the log files located at ./logs

### 5. Stop and remove containers and images

```bash
$ docker compose down --rmi all
```
