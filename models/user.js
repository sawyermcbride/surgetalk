
let options = {};

const pgb = require('pg-promise')(options);
const connectionString = 'postgres://postgres:Mariner166$!@localhost:5432/instagramapi';
const db = pgb(connectionString);

const bcrypt = require('bcrypt');



class User {
    constructor(username, password, email, name) {
        this.username = name;
        this.password = password;
        this.email = password;
        this.name = name;
    }
    save() {
        let self = this;
        return new Promise( (res, rej) => {
            bcrypt.genSalt(10, (err, salt ) => {
                bcrypt.hash(self.password, salt, (err, hash) => {
                    if(err) {
                        rej(err);
                    }
                    db.none("insert into users(username, name, email, password) \
                        values( ${self.username}, ${self.name}, ${self.email}, ${hash}")
                            .then(() => {
                                res();
                            })
                })
            })
        })
    }
}

module.exports = User;