# blogging-platform #
User is able to add blog posts. Blog posts have, a title and plain text where paragraphs are separated by two new-line characters.  User is able to view all blog posts (list-mode) starting with first 5 and then the next 5 and so on. This view will not have any comments.  user is able to click on one of these blogs to view it in full-mode. In full-mode, all past comments on the text are visible next to the text. Also, the viewer is able to comment on a paragraph of text. In essence, the comment is on a paragraph. The API, when it responds with comments should provide some means to figure out which comment is on which paragraph. 

# steps to run project locally #
* install node and npm (https://www.npmjs.com/get-npm,    https://nodejs.org/en/)
* git clone https://github.com/Shiv-Dangi/blogging-platform.git
* cd blogging-platform && npm install
* cd frontend && npm install
* cd ../backend && npm install
* cd .. && npm start
