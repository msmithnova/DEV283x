const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/edx-course-db');

let Book = mongoose.model('Book', {
    name: String,
    published: Boolean,
    createdAt: Date,
    updatedAt: { type: Date, default: Date.now }
});

// author and link do not save as they are not in the model
// updateAt does since it has a default in the model
let practicalNodeBook = new Book({
    name: 'Practical Node.js, 2nd Edition',
    author: 'Azat',
    link: 'https://github.com/azat-co/practicalnode',
    createdAt: Date.now()
});

console.log('Is new?', practicalNodeBook.isNew);
practicalNodeBook.save((err, results) => {
    if (err) {
        console.error(err);
        process.exit(1);
    } else {
        console.log('Saved: ', results);
        console.log('Is new?', practicalNodeBook.isNew);
        // Book.findOne({_id: practicalNodeBook.id}, 'name', (error, bookDoc) => {
        Book.findOne({ _id: practicalNodeBook.id }, (error, bookDoc) => {
            console.log(bookDoc.toJSON());
            console.log(bookDoc.id);
            bookDoc.published = true;
            bookDoc.save((err, results) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                } else {
                    console.log('Saved: ', results);
                    process.exit(0);
                }
            });
            //bookDoc.remove(process.exit);
        });
    }
});