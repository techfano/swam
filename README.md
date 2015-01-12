# swam
Simple Web Application Management, an architectural prototype for modern web applications, using angular AMD, Bootstrap CSS, Grunt and Bower.

#Features

- A simple way to managing your web applications.
- Index.html file generation and administration automatically.
- Bower components administration automatically.
- AngularJS AMD architecture integrated. 
- Controlling your web apps development and distributions
- minifying css and js distribution automatically
- Developing with live reaload (in port: 9000)
 
# Getting started

it's easy to use first you need to instal the follow

- Node.js http://nodejs.org/
- Bower http://bower.io/
- Grunt http://gruntjs.com/getting-started

Enter with your console to the main project file, example:

<code>
cd C:/main or cd /var/html/main
</code>


when you are into the main file execute the follow commands:

- npm install (for install the nodejs dependencies and grunt packages)
- bower install (for install the bower components for to develop)

Finally execute the grunt tasks

<code>
grunt swam
</code>

The command "grunt swam", create automatically the index.html, copy and incorporate inside index the tags for bower dependencies and javascript files, you can administrate too the index.html in the template file

- template/
  - index.html
  - header.html
  - footer.html

<code>
grunt packing
</code>

This command create the "distro" file with the css and js minified, and all the necesary (in advance).


this command is executed for activate the grunt tasks, for to import and order the bower dependencies, minifying css and js files, develop with live overload and other tasks in advance.

Thanks.




