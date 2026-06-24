var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');
let documents = require('../localJsonData/documents.json');

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../localJsonData/documents.json');

/* retrieval of documents from MongoDB
/*router.get('/', (req, res, next) => {
  Document.find()
    .then(documents => {
      res.status(200).json({
          message: 'Documents fetched successfully!',
          documents: staticDocuments
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});*/

router.get('/', (req, res) => {

  console.log('GET /documents called'); // debug log
  res.status(200).json({
    message: 'Documents fetched successfully!',
    documents: documents
  });
});

router.post('/', (req, res, next) => {

    //const maxDocumentId = sequenceGenerator.nextId("documents"); // This code needed when using MongoDB

    const document = new Document({
      //id: maxDocumentId, // This code needed when using sequenceGenerator
      id: Date.now(),
      name: req.body.name,
      //description: req.body.description,
      url: req.body.url
    });

    // This following code needed when using MongoDB
    /*
      document.save()
        .then(createdDocument => {
          res.status(201).json({
            message: 'Document added successfully',
            document: createdDocument
          });
        })
        .catch(error => {
          res.status(500).json({
              message: 'An error occurred',
              error: error
            });
        });
        */

      documents.push(document);

      fs.writeFileSync(DATA_FILE, JSON.stringify(documents, null, 2));

      res.status(201).json({
            message: 'Document added successfully',
              document: document
          });
  });



  router.put('/:id', (req, res, next) => {

    console.log("Let us look at the req.params.id");
    console.log(req.params.id);

    documents = documents.map(doc =>
      doc.id == req.params.id
        ? { ...doc, ...req.body }
        : doc
    );

    console.log("Let us look at the documents");
    console.log(documents);

    fs.writeFileSync(DATA_FILE, JSON.stringify(documents, null, 2));

    res.status(200).json({
      message: 'Documents updated successfully'
    });

    // This code needed when using MongoDB
    /*
    Document.findOne({ id: req.params.id })
      .then(document => {
        document.name = req.body.name;
        document.description = req.body.description;
        document.url = req.body.url;


    Document.updateOne({ id: req.params.id }, document)
          .then(result => {
            res.status(204).json({
              message: 'Document updated successfully'
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
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
      */

  });


  router.delete("/:id", (req, res, next) => {

    // This code needed when using MongoDB
    /*
    Document.findOne({ id: req.params.id })
      .then(document => {
        Document.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Document deleted successfully"
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
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
      */

      documents = documents.filter(doc => doc.id != req.params.id);

            fs.writeFileSync(DATA_FILE, JSON.stringify(documents, null, 2));

            res.status(200).json({
              message: 'Document deleted successfully'
            });
  });

module.exports = router;
