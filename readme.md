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
  - this seemed like a comparable library that offered most of the same functionality and has a decent number of downloads
  - has not been updated in four years so might not be first choice for an actual production deployment
- Probably doing CLI flags manually
  - this ended up taking me way longer than I expected, but I'm resonably happy with my implementation
- `UUID` for added uniqueness for generated names?
  - ended up not being necessary because the emails have an ID already
- Jest for testing

### Program Flow

- Input given
- Check input for options
  - `--help` should yield relevant information
  - `-r` along with a file path to an already parsed email should yield desired information about the parsed email
    - this is not yet implemented
  - just a file path should continue as below:
- Input parsed as file path
- for each file in the directory
  - use `fs` to read file to string
  - parse string with `parse-email`
  - generate name from parsed information using format `[from][to][subject][messageId]` with extraneous characters removed.
  - Create directory for the email with generated name
  - write `body.txt` and `body.htm`
  - write attachments with generated name
    - uses attachment filename prepended with the generated email name for the directory
  - write `manifest.json`

## Next steps

- `-r` functionality to yield information about an already parsed email has not been implemented
- tests are not very thorough. some need to be refactored
  - some of the mocked functions were not behaving as expected, would likely need to use a different kind of mock to make these work right
- the help menu and opts system in general could be a little bit cleaner


