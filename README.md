# Roam
** New Adventures with New People **

**INSERT links to your coverage images here**
[![Build Status](https://secure.travis-ci.org/gotwarlost/istanbul.png)](http://travis-ci.org/gotwarlost/istanbul) [![Dependency Status](https://gemnasium.com/gotwarlost/istanbul.png)](https://gemnasium.com/gotwarlost/istanbul)
--------------------
**INSERT a link to your deployed version**

## Table of Contents 
- [Example / Usage](#example--usage)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
  - [High Level Architecture](#high-level-architecture)
  - [Database Schema](#database-schema)
- [API Endpoints](#api)
- [Contributing](#contributing)
- [Questions and Issues](#questions-and-issues)
- [Meta](#meta)

## Example / Usage
**INSERT a description of how to use your product, if applicable**
* Do you have an outward-facing API? If so, make sure API documentation is linked in TOC or here.
* Does your product have any command-line inputs?

**INSERT awesome GIF of your project**
http://gifmaker.me/

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

ToDO: Fill this out more.

## Architecture
### High Level Architecture
![Architecture](http://i64.tinypic.com/2zpp661.png)
### Database Schema
Postgres using SQLAlchemy ORM
![Schema](http://i68.tinypic.com/23i6plz.jpg)

## API
**For API Documentation, please see the [ENDPOINTS.md](ENDPOINTS.md) file**

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

## Contributing
**INSERT contributing workflow steps or link here**
[APP NAME] was built using waffle.io as the project organization tool.
Please visit the [GITFLOW.MD](GITFLOW.md) for our workflow guidelines.

## Questions and Issues
For any issues, please refer to [**our issues page**](https://github.com/[INSERT TEAM]/[INSERT REPO]/issues)
Please direct any questions regarding [APP NAME] to [**our wiki page**](https://github.com/[INSERT TEAM]/[INSERT REPO]/wiki)

## Meta

Product Owner: [Kent Lee](https://github.com/kqlee)

Scrum Master: [Rodaan Rabang](https://github.com/rodaan)

Development Team: [Esther Cuan](https://github.com/esthercuan), [Dan Sajjad](https://github.com/Dansajjad)

"Distributed under the MIT License."
