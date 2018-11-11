const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports = () => {
    function connect() {
        mongoose.connect('mongodb://localhost:27017/moj', { useNewUrlParser: true })
            .then(() => { console.log('mongodb connected') })
            .catch(err => { console.error(err) });
        require('./problemBookModel');
        require('./problemModel');
        require('./userModel');
        require('./contest');
    }
    connect();
    mongoose.connection.on('disconnected', connect);
};