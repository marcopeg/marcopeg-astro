---
title: "Per-User Encryption with Postgres"
description: "In this article you learn how to apply per-user encryption to the data you store in Postgres. It is quite easy and it will allow you to guarantee the highest level of security and privacy to your users."
pubDate: "2019-07-15T22:00:00.000Z"
updatedDate: "2021-11-02T19:36:57.000Z"
heroImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fGVuY3J5cHRpb258ZW58MHx8fHwxNjM1ODgxMzkw&ixlib=rb-1.2.1&q=80&w=2000"
---

It’s a tough world that we are living in. Users want privacy. **Storing plain data in our DB is not enough anymore**.

Crazy, uh?

In this article, we will consider a possible approach to improve the level of security and privacy of our storage strategy using [PostgreSQL](https://www.postgresql.org/).

We will cover:

*   basic encryption
*   sandwich encryption
*   encryption key migrations

## Preparation

In order to follow the content of this article and get the best out of it, you should be able to run some queries against a PostgreSQL database.

> You can run a free PostgreSQL on [ElephantSQL](https://www.elephantsql.com/) 🤘

For the purpose of this tutorial we are going to read and write some **sensible data that are tied to a user identity**:

```sql
CREATE TABLE users (
    name VARCHAR(255),
    data TEXT
);
```

Write query example:

```sql
INSERT INTO users (name, data)
VALUES ('marco', 'marco stuff');
```

Read query example:

```sql
SELECT * FROM users WHERE name = 'marco';
```

Update query example:

```sql
UPDATE users
SET data = 'some other private stuff'
WHERE name = 'marco';
```

## Basic Encryption

The general idea with **basic encryption** is that the way we save data so far is quite open to external access. I’m not talking about _NSA_ hackers, I’m talking much simpler - everyday problem - security stuff.

**What happens if you take a dump of the database for backup purposes?** Who can read it? Your employees? Your DevOps only? Is it safe for them to be able to do so? I don’t think so. _GDPR legislators don't think so._

With the **basic encryption**, we are going to **encrypt the** `**data**` **column** using a **server password** that you will not share with your employees. That password should be set as **ENVIRONMENT VARIABLE** and should have different values between development, staging, and production environments.

The first step is to enable the [pgcrypto](https://www.postgresql.org/docs/8.3/pgcrypto.html) extension that we will use to apply a **symmetric encryption** strategy:

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

To **encrypt a plain string** with a password you can use:

```sql
PGP_SYM_ENCRYPT('marco stuff', 'key')::text
```

To **decrypt** back to a plain string you can use:

```sql
PGP_SYM_DECRYPT(column_name::bytea, 'key')
```

📌 **NOTE:** the casting between `text` and `bytea` is important to guarantee the expected format of our simple schema.

Now we can simply apply an encryption instruction to our queries:

```sql
-- Insert Encrypted
INSERT INTO users (name, data)
VALUES ('marco', PGP_SYM_ENCRYPT('marco stuff', 'key')::text);

-- Update Encrypted
UPDATE users
SET data = PGP_SYM_ENCRYPT('some other private stuff', 'key')::text
WHERE name = 'marco';

-- Read and decrypt
SELECT
	name,
	PGP_SYM_DECRYPT(data::bytea, 'key') as data
FROM users WHERE name = 'marco';
```

📌 **IMPORTANT:** the `key` should be a fairly robust password that is given to your application as **ENVIRONMENT VARIABLE**. It should never be hardcoded or committed to any repository, and it shouldn’t be distributed to your team members!

✅ Strengths:

*   people (aka your employees) will not be able to (easily) read into users data
*   **you can store your backups as plain dumps and they are still fairly safe**
*   backup/restore operations are easy if you know the encryption key

🔸Limitations:

*   symmetrical encryption strategies will not stand a serious brute force attack _(NSA people will read your stuff, China people will read your stuff, Russians as well. Italians... meh...)_
*   encrypted data is not indexable nor searchable
*   not so easy to debug (but that is a tradeoff)

## Sandwich Encryption

So far you have achieved a decent level of protection and your user’s data are protected from unauthorized access.

**🔔But, the problem now is that you still can read through anybody’s data!**

What if you want to guarantee that whatever a single user writes in your system, will remain private to her own eyes?

👉 The obvious solution is to **use a _per-user_ encryption key**. This could be the user’s plain password or just a _PIN_. The trick is that this piece of information **should never be persisted into your database**, and not even in your server’s memory.

But this is still not enough, because if some bad guy manages to steal the user’s PIN and a dump of the database, they will still be able to decode the data. Here is where **Sandwich Encryption** comes in handy.

We will take the per-user encrypted data, and encrypt it with the server’s production key.

✅ Strengths:

*   **you and your employees will not be able to read what your users write**
*   an attacker needs to know both the server’s key and the user’s PIN

🔸Limitations:

*   every read/write operation need doubles in complexity as 2 encryption operations are performed
*   if the user changes her password, all the encrypted data must be re-encoded

> My personal solution is to store an encrypted hash of the user’s encryption key (say her password) in the session’s cookie. This cookie travels with every request (strictly on SSL), so my server can grab it, decode the hashed pin and use that as per-user key.

```sql
-- Insert with Sandwich Encryption
INSERT INTO users (name, data)
VALUES ('marco',
	PGP_SYM_ENCRYPT(
		PGP_SYM_ENCRYPT(
			'marco stuff',
			'userKey'
		)::text,
		'serverKey'
	)::text
);


-- Update with Sandwich Encryption
UPDATE users
SET data =
	PGP_SYM_ENCRYPT(
		PGP_SYM_ENCRYPT(
			'some other private stuff',
			'userKey'
		)::text,
		'serverKey'
	)::text
WHERE name = 'marco';

-- Read and decode with Sandwich Encryption
SELECT
	name,
	PGP_SYM_DECRYPT(
		PGP_SYM_DECRYPT(
			data::bytea,
			'serverKey'
		)::bytea,
		'userKey'
	) as data
FROM users WHERE name = 'marco';
```

## How to Migrate Encryption Keys

The **Sandwich Encryption** is fairly safe. It basically guarantees full privacy to your users unless your employees are _NSA_ undercover agents. Which is quite enough for current _GDPR_ requirements.

**🔔But, what happens when the user changes their password or PIN?**

Well, this is tricky as she might permanently lose access to all the data she saved with the old password!

During the password update, we need to use the `oldPassword` to decrypt the user’s data, and then the `newPassword` to re-encrypt it:

```sql
-- Migrate encryption keys
UPDATE users SET data =
	PGP_SYM_ENCRYPT(
		PGP_SYM_ENCRYPT(
			PGP_SYM_DECRYPT(
				PGP_SYM_DECRYPT(data::bytea, 'serverKey')::bytea,
				'userKey'
			),
			'newUserKey'
		)::text,
	'serverKey'
);

-- Read with the new user's key
SELECT
	name,
	PGP_SYM_DECRYPT(
		PGP_SYM_DECRYPT(
			data::bytea,
			'serverKey'
		)::bytea,
		'newUserKey'
	) as data
FROM users WHERE name = 'marco';
```

Depending on the amount of data that your system needs to store this **could be a demanding operation**. You might need to batch this operation to portions of your data and use a cursor to dilute the job in multiple iterations.

> For that purpose you might need to temporarly persist the old/new keys somewhere and this could expose the user’s data to a degree of risk of unauthorized access, or data loss.

Again, security is a tradeoff!

## How to use Sequelize with Data Encryption?

Raw queries are cool, but if you are a Node geek like me, you are probably using [Sequelize](http://docs.sequelizejs.com/). _(2021 Update: don't! queries are better)_

Here is some code that you can use to run the example above:

```js
// Returns an instance of the User's Model
// @conn Sequelize connection object
const initUserModel = async (conn) => {
    const Model = conn.define('User', {
        name: {
            type: Sequelize.STRING,
        },
        data: {
            type: Sequelize.TEXT,
        },
    })

    await conn.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
    return Model.sync()
}

// Insert data into the User's table
const createUser = (name, data, userKey, serverKey) =>
    User.create({
        name:,
        data:
            Sequelize.fn(
                'PGP_SYM_ENCRYPT',
                Sequelize.cast(Sequelize.fn(
                    'PGP_SYM_ENCRYPT',
                    data,
                    userKey
                ), 'text'),
                serverKey
            ),
    })

// Read out encrypted data:
const findUser = (name, userKey, serverKey) =>
    User.findOne({
        where: { name },
        attributes: [
            'name',
            [
                Sequelize.fn(
                    'PGP_SYM_DECRYPT',
                    Sequelize.cast(Sequelize.fn(
                        'PGP_SYM_DECRYPT',
                        Sequelize.cast(Sequelize.col('data'), 'bytea'),
                        serverKey
                    ), 'bytea'),
                    userKey
                ),
                'data',
            ],
        ],
    })

// Migrate User's Keys
const migrateUserKey = (name, oldKey, newKey, serverKey) =>
    Yser.update({
        data: Sequelize.fn(
            'PGP_SYM_ENCRYPT',
            Sequelize.cast(Sequelize.fn(
                'PGP_SYM_ENCRYPT',
                Sequelize.fn(
                    'PGP_SYM_DECRYPT',
                    Sequelize.cast(Sequelize.fn(
                        'PGP_SYM_DECRYPT',
                        Sequelize.cast(Sequelize.col('data'), 'bytea'),
                        serverKey
                    ), 'bytea'),
                    oldKey
                ),
                newKey
            ), 'text'),
            serverKey
        ),
    }, { where: { name } })
```

## Conclusions

It is definitely not difficult to apply basic encryption protection to the data that we save in our database.

The level of security that we can handle with the ideas from this article will guarantee that I can not access my user’s data. I am definitely not capable of brute-forcing that :-)

Among other safety checks that you may want to look into there are:

*   enable disk-level encryption
*   restrict access to _SSL_ connections
*   whitelisting client’s IPs
*   run your database in a private network
*   (I’m sure there is plenty of stuff that I don’t know…)

Please, use the comments below to let me know what you think, and to suggest improvements to this article!

**👉 We are all learning together 😎**