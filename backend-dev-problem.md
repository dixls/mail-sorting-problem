# Your Programming Problem

You're going to write a program to break down and store the contents of a bunch
of email messages.

Please note that while this is a relatively simple matter of programming, we
are particularly interested in seeing the design of your solution. We will
evaluate your code not only based on correctness but also based on design and
organization. Pretend this is code being written to go into production.  If you
find parts of the spec unclear, implement what you think makes sense and make a
note of it.  Nothing in here is intended as a "trick question."

There are a fair number of features below.  You can implement a subset of this.
A partial implementation is better than giving up in annoyance!

Your program will take the messages and write their contents to the filesystem,
with the following constraints:

* input will be given as directory of files, each one containing an email
  message (RFC 5322)
* in the output, every message gets its own directory, with a unique name that
  can be computed from the message itself
* text and html parts, except for attachments, get written as UTF-8 to
  `body.txt` and `body.htm` (if there's more than one of either, only save one
  this way)
* all other attachments are written to files with unique names computable from
  the message
* a file called `manifest` is written in some easy-to-load format that maps
  from the structure of the source message to the files written out
* all created files are mode read/write only for the current user

Also include a program that, pointed at one of these generated directories, can
print the message's from/to/subject/date, the structure of the original
message, and the path to the filename in which each part can be found.

Ideally, implement the program in one or more Perl 5 modules.  Target whatever
version of perl you like, using whatever libraries you like, as long as we can
install them from the CPAN.  Include at least a simple set of tests using the
standard test libraries.  Also include an executable program that takes the
paths to its input Maildir as arguments and responds to --help and any other
relevant options.

We suggest the following libraries as appropriate for this task:

* Email::MIME
* Getopt::Long::Descriptive
* JSON

With Perl installs, you should just be able to run (for example) "cpan
Email::MIME" to install that library.

If you choose to implement only a subset of this specification, let us know how
long you spent on it, and how you decided what to leave out.

