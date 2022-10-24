# Email Breakdown Sorting and Storing

## To use this program

To read the contents of a directory and sort them to the default output directory:
``` sh
npm run sort-email [input directory]
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
- Show message indicating successful completion with path to output directory


