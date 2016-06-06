# Roam

New Adventures, New People

![App Icon](http://i68.tinypic.com/ojkxhj.png)

![mockup](http://i64.tinypic.com/2r5eosg.png)

## Table of Contents 

- [Technology Stack](#tech-stack)
- [Example / Usage](#example--usage)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
  - [High Level Architecture](#high-level-architecture)
  - [Database Schema](#database-schema)
- [Team Members](#team-members)

##Technology Stack
- React Native
- Node.js & Express
- Neo4j
- Yelp API
- Geolocations API
- Gmail API
- Nodemailer

## Example / Usage

Simply create an account, select a time when you are free, and wait for an email confirmation for your next roam!

![roam](http://i65.tinypic.com/t9xrwl.gif)

## Getting Started

Please install neo4j community edition. Run the neo4j application. Upon running the neo4j application run the following command on the browser app served up by the application:

```
:server connect
```

When prompted, set a password to your neo4j database.

Ensure you create a .apoc.yml file within the home directory containing this:
```
protocol: http
host: 127.0.0.1
port: 7474
username: neo4j
password: roam
```

Be sure to change the port in the file above to the port you've chosen to run neo4j on and change the password to the one you've added to your database.

Next, install the client-side dependencies by going to the roam directory in terminal and entering:
```
$ npm install
```

Please create a developer account on Yelp and gmail for API keys. Create an apiKeys.js file within the Utils directory.

Template usage: 

```
module.exports.yelpKeys = {
  consumer_key: '',
  consumer_secret: '',
  token: '',
  token_secret: ''
};

module.exports.gmailKeys = {
  "client_id": '',
  "project_id": '',
  "auth_uri": '',
  "token_uri": '',
  "auth_provider_x509_cert_url": '',
  "client_secret": ''
};

```
Be sure to include your personal keys on the above template.

Ensure ports are listed correctly.

Also, create a gmail account from where the confirmation email for each roam should be received.

## Architecture
### High Level Architecture
![Architecture](http://i67.tinypic.com/rvyayu.jpg)
### Database Schema
Neo4j using apoc

![Schema](http://i65.tinypic.com/ibvuvm.png)

### Roadmap

Features for v2.0

- Confirmation on App
- Chat functionality enabled once people are near venue
- Tokened sessions
- Push notifications 
- Route to destination with distance and time approximation
- User ratings and review
- More refined matching algorithm that includes historical data
- Uber request functionality
- See the history of roams
- Profile picture
- iBeacon

## Team Members

Product Owner: [Kent Lee](https://github.com/kqlee)

Scrum Master: [Rodaan Rabang](https://github.com/rodaan) 

Development Team: [Esther Cuan](https://github.com/esthercuan), [Dan Sajjad](https://github.com/Dansajjad)

"Distributed under the MIT License."