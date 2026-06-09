var express = require('express');
var router = express.Router();
//const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');
let contacts = require('../localJsonData/contacts.json');

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../localJsonData/contacts.json');
//const contacts = JSON.parse(fs.readFileSync(DATA_FILE));

/* retrieval of contacts from MongoDB
router.get('/', (req, res, next) => {
  Contact.find()
    .populate('group')
    .then(contacts => {
      res.status(200).json({
          message: 'Contacts fetched successfully!',
          contacts: contacts
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

// retrieval of contacts from local JSON file
router.get('/', (req, res) => {
  //const contacts = JSON.parse(fs.readFileSync(DATA_FILE));

  console.log('GET /contacts called'); // debug log
  res.status(200).json({
    message: 'Contacts fetched successfully!',
    contacts: contacts
  });

});


 router.post('/', (req, res, next) => {
    // This code needed when using MongoDB
    //const maxContactId = sequenceGenerator.nextId("contacts");

    //const contacts = JSON.parse(fs.readFileSync(DATA_FILE));

    const contact = new Contact({
      //id: maxContactId, // This code needed when using sequenceGenerator
      id: Date.now(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
      group: req.body.group
    });

    // This code needed when using MongoDB
    /*contact.save()
      .then(createdContact => {
        res.status(201).json({
          message: 'Contact added successfully',
          contact: createdContact
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });*/

      contacts.push(contact);

      fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));

      res.status(201).json({
        message: 'Contact added successfully',
          contact: contact
      });
  });


  router.put('/:id', (req, res, next) => {

    //const contacts = JSON.parse(fs.readFileSync(DATA_FILE));

    contacts = contacts.map(cont =>
      cont.id == req.params.id
        ? { ...cont, ...req.body }
        : cont
    );

    console.log("Contacts on server before writing to json file =================");
    console.log(contacts);

    fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));

    res.status(200).json({
      message: 'Contacts updated successfully'
    });

    // This code needed when using MongoDB
    /*Contact.findOne({ id: req.params.id })
      .then(contact => {
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl;
        contact.group = req.body.group;

        Contact.updateOne({ id: req.params.id }, contact)
          .then(result => {
            res.status(204).json({
              message: 'Contact updated successfully'
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
          message: 'Conctact not found.',
          error: { contact: 'Contact not found'}
        });
      });*/
  });


  router.delete("/:id", (req, res, next) => {

    // This code needed when using MongoDB
    /*Contact.findOne({ id: req.params.id })
      .then(contact => {
        Contact.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Contact deleted successfully"
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
          message: 'Contact not found.',
          error: { contact: 'Contact not found'}
        });
      });*/

      //const contacts = JSON.parse(fs.readFileSync(DATA_FILE));

      contacts = contacts.filter(cont => cont.id != req.params.id);

      fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));

      res.status(200).json({
        message: 'Contact deleted successfully'
      });

  });


module.exports = router;
