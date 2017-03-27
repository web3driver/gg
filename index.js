'use strict';

var fs = require('fs');
var path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function compare(a, b) {
    return a.localeCompare(b)
}

var name = [];

if (fs.statSync(resolve('api')).isDirectory()) {
    fs.readdirSync(resolve('api')).forEach(function (file, i) {
        if (!new RegExp('.+\.md$').test(file)) return;
        if ('SUMMARY.md' === file || 'README.md' === file) return;
        var _file = file;
        name.push(_file.slice(0,-3));
    });
}

name.sort(compare);

fs.writeFile(resolve('api/SUMMARY.md'), '', {
    'flag': 'w'
}, function (err) {
    if (err) {
        throw err;
    }
})

name.forEach(function (v) {
    fs.writeFile(resolve('api/SUMMARY.md'), 
    '- ['+ v +'](' + v + '.md)\n',
    {
        'flag': 'a+'
    }, function (err) {
        if (err) {
            throw err;
        }
    })
});