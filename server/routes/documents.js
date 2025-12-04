var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

const staticDocuments = [
  {
    id: '1',
    name: 'CIT 425 - Data Warehousing',
    url: 'https://rkjdatawarehousing.wordpress.com/',
    children: [
      {
        id: '2',
        name: 'Project 1 – The Kimball Method',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-1-the-kimball-method/'
      },
      {
        id: '3',
        name: 'Project 2 – Data warehouses vs. marts',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-2-data-warehouses-vs-marts/'
      },
      {
        id: '4',
        name: 'Project 3 – The ETL Process',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-3-the-etl-process/'
      },
      {
        id: '5',
        name: 'Project 4 – Modify the OLTP design',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-4-oltp-modifications-to-erp-design/'
      },
      {
        id: '6',
        name: 'Project 5 – The OLAP design',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-4/'
      },
      {
        id: '7',
        name: 'Project 6 – Transforming data',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/transforming-data/'
      },
      {
        id: '8',
        name: 'Project 7 – MarkLogic',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-7-marklogic/'
      },
      {
        id: '9',
        name: 'Project 8 – Build a web application',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-8/'
      }
    ]
  },
  {
    id: '10',
    name: 'CIT 460 - Enterprise Development',
    url: 'https://rkjackson.wordpress.com/',
    children: [
      {id: '12', name: 'Case 1 – Defining the requirements', url: 'https://rkjackson.wordpress.com/cases/case-1/'},
      {id: '13', name: 'Case 2 – User Interface design', url: 'https://rkjackson.wordpress.com/cases/case-2/'},
      {
        id: '14', name: 'Case 3 – Implementing Model Layer', url: 'https://rkjackson.wordpress.com/cases/case-3/',
        children: [
          {'id': '36', name: 'Team Assignment', 'description': 'Create your first JavaBean class'}
          , {'id': '37', name: 'Individual Assignment', 'description': 'Create remaining JavaBean classes'}
        ]
      },
      {id: '15', name: 'Case 4 – Enterprise Java Session Beans', url: 'https://rkjackson.wordpress.com/cases/case-4/'},
      {id: '16', name: 'Case 5 – Implementing the View', url: 'https://rkjackson.wordpress.com/cases/case-5/'},
      {id: '17', name: 'Case 6 – A Framework for the View Layer', url: 'https://rkjackson.wordpress.com/cases/case-6/'}
    ]
  },
  {
    id: '20',
    name: 'CIT 366 - Full Web Stack Development',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
    children: [
      {
        'id': '21',
        'name': 'Lesson 1 - JavaScript Best Practices',
        'url': 'https://content.byui.edu/file/f0594919-9524-47eb-9f4d-5c7239c3c002/1/Lesson1Introduction.pdf'
      },
      {
        'id': '22',
        'name': 'Lesson 2 - The DOM and JQuery',
        'url': 'https://content.byui.edu/file/c67e59fd-990c-4adc-9232-8027f847c8b9/1/Lesson2Introduction.pdf'
      },
      {
        'id': '23',
        'name': 'Lesson 3 - Angular 2 Framework 1',
        'url': 'https://content.byui.edu/file/aa9b6af5-b882-48f5-8321-caca980e5ec9/1/Lesson3Introduction.pdf'
      },
      {
        'id': '24',
        'name': 'Lesson 4 - Angular 2 Framework 2',
        'url': 'https://content.byui.edu/file/2c4ddd6c-dce4-408d-b581-f254a13e4d10/1/Lesson4Introduction.pdf'
      },
      {
        'id': '25',
        'name': 'Lesson 5 - Angular 2 Framework 3',
        'url': 'https://content.byui.edu/file/66dc0765-22a7-4cd8-a184-942c607636fb/1/Lesson5Introduction.pdf'
      }
    ]
  },
  {
    id: '40',
    name: 'CIT 366 - Full Web Stack Development',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
  {
    id: '41',
    name: 'CIT 240 - Introduction to Networking',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
  {
    id: '42',
    name: 'CIT 370 - Computer Security I',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
  {
    id: '43',
    name: 'CIT 360 - Object Oriented Programming II',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
  {
    id: '44',
    name: 'CIT 470 - Computer Security II',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
  {
    id: '45',
    name: 'CIT 262 - Mobile Development',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
  {
    id: '46',
    name: 'CIT 230 - Web Page Development',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
  {
    id: '47',
    name: 'CIT 236 - Web Development',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
  {
    id: '48',
    name: 'CIT 340 - Networking II',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
  },
];


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
    documents: staticDocuments
  });
});

 router.post('/', (req, res, next) => {

  

    const maxDocumentId = sequenceGenerator.nextId("documents");
  
    const document = new Document({
      id: maxDocumentId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url
    });

    console.log("Inside router.post");
  console.log(document);
  
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
  });


  router.put('/:id', (req, res, next) => {
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
  });


  router.delete("/:id", (req, res, next) => {
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
  });

module.exports = router; 