module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "mocha": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],

        "no-multiple-empty-lines": [
            2, {"max": 3, "maxBOF": 0}],

    
        "no-multiple-empty-lines": [
             2, {"max": 3, "maxEOF": 0}]
    

    
    }
};