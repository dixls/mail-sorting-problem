# Email Breakdown Sorting and Storing

## To use this program

First setup the local node environment with
```
npm install
```

and create a local `.env` file that contains the following
```
TESTING = false
OUTPUT_DIRECTORY = "output/"
```
You should now be able to use the app locally

To read the contents of a directory and sort them to the default output directory:
```
node index.js [input directory]
```

Included in this repository is a folder of test emails so you can test the app functionality with
```
node index.js text_emails
```


## General Program Notes

- Using node package `parse-email` instead of perl package `Email::MIME`
- Probably doing CLI flags manually
- `UUID` for added uniqueness for generated names?
- Jest for testing

### Program Flow

- Input given
- Check input for options
  - `--help` should yield relevant information
  - `-r` along with a file path to an already parsed email should yield desired information about the parsed email
  - just a file path should continue as below:
- Input parsed as file path
- for each file in the directory
  - use `fs` to read file to string
  - parse string with `parse-email`
  - generate name from parsed information and `UUID`
  - Create directory for the email with generated name
  - write `body.txt` and `body.htm`
  - create generated name for attachments
  - write attachments with generated name
  - write `manifest`

## Next steps

- `-r` functionality to yield information about an already parsed email has not been implemented
- tests are not very thorough. some need to be refactored


