echo "posts account data"
curl -H "Content-Type: application/json" -X POST -d '{"balance": "1000", "name": "savings"}' "http://localhost:3000/accounts"
echo; echo

echo "gets account data"
curl "http://localhost:3000/accounts"
echo; echo