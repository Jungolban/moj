const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports = () => {
    function connect() {
        mongoose.createConnection('mongodb://localhost:27017/moj', { useNewUrlParser: true })
            .then(() => { console.log('mongodb connected') })
            .catch(err => { console.error(err) });
        require('./problemBookModel');
        require('./problemModel');
        require('./userModel');
        require('./noticeModel');
        require('./postModel');
        require('./contestModel');
    }
    connect();
    mongoose.connection.on('disconnected', connect);
};