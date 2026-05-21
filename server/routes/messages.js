var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');
const messages = require('../localJsonData/messages.json');

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../localJsonData/messages.json');

/* retrieval of messages from MongoDB
router.get('/', (req, res, next) => {
  Message.find()
    .then(messages => {
      res.status(200).json({
          message: 'Messages fetched successfully!',
          messages: messages
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});
*/

router.get('/', (req, res) => {
  console.log('GET /messages called'); // debug log
  res.status(200).json({
    message: 'Messages fetched successfully!',
    messages: messages
  });
});

 router.post('/', (req, res, next) => {

    //const maxMessageId = sequenceGenerator.nextId("messages");

    const message = new Message({
      //id: maxMessageId, // This code needed when using sequenceGenerator
      id: Date.now(),
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: req.body.sender
    });

    // This code needed when using MongoDB
    /*
    message.save()
      .then(createdMessage => {
        res.status(201).json({
          message: 'Message added successfully',
          message: createdMessage
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
      */

      messages.push(message);

            fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));

            res.status(201).json({
              message: 'Message added successfully',
                message: message
            });
  });


  router.put('/:id', (req, res, next) => {

    messages = messages.map(cont =>
      mess.id == req.params.id
        ? { ...mess, ...req.body }
        : mess
    );

    fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));

    res.status(200).json({
      message: 'Messages updated successfully'
    });

    // This code needed when using MongoDB
    /*
    Message.findOne({ id: req.params.id })
      .then(message => {
        message.subject = req.body.subject;
        message.msgText = req.body.msgText;
        message.sender = req.body.sender;

        Message.updateOne({ id: req.params.id }, message)
          .then(result => {
            res.status(204).json({
              message: 'Message updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Message not found.',
          error: { message: 'Message not found'}
        });
      });
      */
  });


  router.delete("/:id", (req, res, next) => {

    // This code needed when using MongoDB
    /*
    Message.findOne({ id: req.params.id })
      .then(message => {
        Message.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Message deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Message not found.',
          error: { message: 'Message not found'}
        });
      });
      */

      messages = messages.filter(mess => mess.id != req.params.id);

      fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));

      res.status(200).json({
        message: 'Maessage deleted successfully'
      });

  });

module.exports = router;
