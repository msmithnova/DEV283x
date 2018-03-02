echo "posts post data"
curl -H "Content-Type: application/json" -X POST -d '{"name": "Top 10 ES6 Features", "url":"http://webapplog.com/es6", "text": ""}'  "http://localhost:3000/posts"
echo; echo

echo "updates post data at specific id"
curl -H 'Content-Type: application/json' -X PUT -d '{"name": "Top 10 ES6 Features Every Developer Must Know", "url":"http://webapplog.com/es6", "text": ""}' "http://localhost:3000/posts/1"
echo; echo

echo "gets post data"
curl "http://localhost:3000/posts"
echo; echo

echo "deletes post data at specific id"
curl -X DELETE "http://localhost:3000/posts/1"
echo; echo

echo "gets post data again"
curl "http://localhost:3000/posts"
echo; echo

echo "posts comment data"
curl -H "Content-Type: application/json" -X POST -d '{"text": "This is a test"}'  "http://localhost:3000/posts/0/comments"
echo; echo

echo "updates comment data at specific id"
curl -H 'Content-Type: application/json' -X PUT -d '{"text": "This is another test"}' "http://localhost:3000/posts/0/comments/1"
echo; echo

echo "gets comment data"
curl "http://localhost:3000/posts/0/comments"
echo; echo

echo "deletes comment data at specific id"
curl -X DELETE "http://localhost:3000/posts/0/comments/0"
echo; echo

echo "gets comment data again"
curl "http://localhost:3000/posts/0/comments"
echo; echo