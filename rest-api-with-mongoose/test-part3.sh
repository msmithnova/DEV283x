echo "deletes account data at specific id, NOTE: replace 'id' in 'http://localhost:3000/accounts/id' with the id generated by the previous POST command"
curl -X DELETE "http://localhost:3000/accounts/$1"
echo; echo