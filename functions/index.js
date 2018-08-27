/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const secureCompare = require('secure-compare');
// Maximum concurrent account deletions.


/**
 * When requested this Function will delete every user accounts that has been inactive for 30 days.
 * The request needs to be authorized by passing a 'key' query parameter in the URL. This key must
 * match a key set as an environment variable using `firebase functions:config:set cron.key="YOUR_KEY"`.
 */
exports.mempoolcleanup = functions.https.onRequest((req, res) => {
    const key = req.query.key;

    // Exit if the keys don't match.
    if (!secureCompare(key, functions.config().cron.key)) {
        console.log('The key provided in the request does not match the key set in the environment. Check that', key,
            'matches the cron.key attribute in `firebase env:get`');
        res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the ' +
            'cron.key environment variable.');
        return null;
    }

   const db = admin.firestore();
   const collectionMempool = db.collection('mempool');
   const collectionTransactions = db.collection('transactions');


    return collectionMempool.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                collectionTransactions.add(doc.data());
                doc.ref.delete();
            });
            return res.json({result: 'cleaned Mempool'});
        })
        .catch(err => {
            return res.status(403).json({result: err.toString()});
        });
});

exports.mempoolcreateDocument = functions.https.onRequest((req, res) => {
    const input = req.query.input;
    const output = req.query.output;
    const value = req.query.value;

    const db = admin.firestore();
    const collectionMempool = db.collection('mempool');

    return collectionMempool.add(
        {
            input: input,
            output: output,
            value: value
        }
        ).then((writeResult) => {
        // Send back a message that we've succesfully written the message
        return res.json({result: `Message with ID: ${writeResult.id} added.`});
    });

});



