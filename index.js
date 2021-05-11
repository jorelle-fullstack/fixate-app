var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('public/index.html');
});

// app.get('/ajaxcall', function(req, res){
//     var data = {
//         contactId: 1,
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john.doe@domain.com',
//         phone:'987654'
//     };

//     res.send(data);
// });

app.listen(process.env.PORT || 5000);