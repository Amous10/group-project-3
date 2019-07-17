const mongoose = require('mongoose');
const db = require('../models');

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pantrychef');

const bookSeed = [
  {
    _id: ObjectId('5d26b1a6df3b20044776c51d'),
    bookId: 'DbuCZxpfzhAC',
    title: 'United States Water Law',
    authors: 'John W. Johnson',
    description:
      'A Vital Explanation of Water Law and Policy Because demand for and access to quality water far exceeds the current supply, it is increasingly critical to understand the state and federal laws and policies that govern water rights. From farming, fishing, and biology to manufacturing, mine operation, and public water supply, water regulation affects all strata of society. Determining U.S. Water Rights: Different Systems for Different Needs United States Water Law: An Introduction is a concise overview of law and policy related to U.S. water rights and regulation of water quantity and quality. This wide-ranging book reviews the two major systems used to determine rights in the western and eastern states. It explores these different systems, which are based on the divergent factors affecting the two regions – the immense amount of government-owned property and arid conditions in the west, and ownership of riparian land in the east. The author also covers western states that adhere to the "hybrid" system, which recognizes early riparian rights predating adoption of later appropriation systems, and he explains that most states recognize at least some riparian rights to the use of surface water. Special sections detail regulatory considerations such as Native American rights, environmental regulation, nuisance and tort law, and social theory. Tools to Aid Further Research To elucidate basic principles and differences in water law, this book contains Internet links to state water codes and contact information for regulatory agencies that handle applications. It presents key federal case law and statutes and other features to reinforce the material. For law practitioners and environmentalists to property/business owners acquiring or retaining water rights, this is the ideal primer on water law, with numerous tools to aid in further research.',
    image:
      'http://books.google.com/books/content?id=DbuCZxpfzhAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    link:
      'https://play.google.com/store/books/details?id=DbuCZxpfzhAC&source=gbs_api',
    __v: 0
  },
  {
    _id: ObjectId('5d26b1abdf3b20044776c51e'),
    bookId: 'apZGDwAAQBAJ',
    title: 'Learning Redux',
    authors: 'Daniel Bugl',
    description:
      'Build consistent web apps with Redux by easily centralizing the state of your application. About This Book Write applications that behave consistently, run in different environments (client, server and native), and are easy to test Take your web apps to the next level by combining the power of Redux with other frameworks such as React and Angular Uncover the best practices and hidden features of Redux to build applications that are powerful, consistent, and maintainable Who This Book Is For This book targets developers who are already fluent in JavaScript but want to extend their web development skills to develop and maintain bigger applications. What You Will Learn Understand why and how Redux works Implement the basic elements of Redux Use Redux in combination with React/Angular to develop a web application Debug a Redux application Interface with external APIs with Redux Implement user authentication with Redux Write tests for all elements of a Redux application Implement simple and more advanced routing with Redux Learn about server-side rendering with Redux and React Create higher-order reducers for Redux Extend the Redux store via middleware In Detail The book starts with a short introduction to the principles and the ecosystem of Redux, then moves on to show how to implement the basic elements of Redux and put them together. Afterward, you are going to learn how to integrate Redux with other frameworks, such as React and Angular. Along the way, you are going to develop a blog application. To practice developing growing applications with Redux, we are going to start from nothing and keep adding features to our application throughout the book. You are going to learn how to integrate and use Redux DevTools to debug applications, and access external APIs with Redux. You are also going to get acquainted with writing tests for all elements of a Redux application. Furthermore, we are going to cover important concepts in web development, such as routing, user authentication, and communication with a backend server After explaining how to use Redux and how powerful its ecosystem can be, the book teaches you how to make your own abstractions on top of Redux, such as higher-order reducers and middleware. By the end of the book, you are going to be able to develop and maintain Redux applications with ease. In addition to learning about Redux, you are going be familiar with its ecosystem, and learn a lot about JavaScript itself, including best practices and patterns. Style and approach This practical guide will teach you how to develop a complex, data-intensive application leveraging the capabilities of the Redux framework.',
    image:
      'http://books.google.com/books/content?id=apZGDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    link:
      'https://play.google.com/store/books/details?id=apZGDwAAQBAJ&source=gbs_api',
    __v: 0
  },
  {
    _id: ObjectId('5d26b501d67b3c08de34a43f'),
    bookId: 'kXkygKPwMTsC',
    title: 'Code of Federal Regulations, Title 21, Food and Drugs',
    authors: 'National Archives & Rec. Admin.',
    description:
      'The Code of Federal Regulations is a codification of the general and permanent rules published in the Federal Register by the Executive departments and agencies of the United States Federal Government.',
    image:
      'http://books.google.com/books/content?id=kXkygKPwMTsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    link:
      'http://books.google.com/books?id=kXkygKPwMTsC&dq=title:code&hl=&source=gbs_api',
    __v: 0
  },
  {
    _id: ObjectId('5d26b503d67b3c08de34a440'),
    bookId: 'vVJSShGkqoAC',
    title: 'Code of Federal Regulations Title 21 Food and Drugs',
    description:
      'The Code of Federal Regulations is a codification of the general and permanent rules published in the Federal Register by the Executive departments and agencies of the United States Federal Government.',
    image:
      'http://books.google.com/books/content?id=vVJSShGkqoAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    link:
      'http://books.google.com/books?id=vVJSShGkqoAC&dq=title:code&hl=&source=gbs_api',
    __v: 0
  }
];

db.Book.remove({})
  .then(() => db.Book.collection.insertMany(bookSeed))
  .then(data => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
