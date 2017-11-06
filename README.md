# <img src="https://potatoes.ahdb.org.uk/sites/default/files/150824_Potato_4PRINT-Kindred-v1-A5%20cropped.jpg" width="40px"> FreshPotatoes.com


## API Specifications

##### List Recommendations

Returns a list of top-rated, recommended films related to the matched film.

```

GET /films/:film_id/recommendations

```

**Parameters**

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td>limit</td>
    <td>integer</td>
    <td>(optional)
The desired number of results returned.</td>
    <td>10</td>
  </tr>
  <tr>
    <td>offset</td>
    <td>integer</td>
    <td>(optional)
Specifies the first entry to be returned from the collection.
    <td>1</td>
  </tr>
</table>


**Successful Response**

```
{
  "recommendations" : [
    {
      "id": 109,
      "title": "Reservoir Dogs",
      "releaseDate": "09-02-1992",
      "genre": "Action",
      "averageRating": 4.2,
      "reviews": 202
    },
    {
      "id": 102,
      "title": "Jackie Brown",
      "releaseDate": "09-15-1997",
      "genre": "Action",
      "averageRating": 4.1,
      "reviews": 404
    },
    {
      "id": 85,
      "title": "True Romance",
      "releaseDate": "09-25-1993",
      "genre": "Action",
      "averageRating": 4.0,
      "reviews": 165098
    }
  ],
  "meta": {
    "limit": 10,
    "offset": 0
  }
}

```

**Failure Response** - Use the test suite for guidance on specific error messages.

```
{
  "message" : "Return an explicit error here"
}
```

---

## FreshPotatoes Technologies

#### Codebase

The FreshPotatoes API service will be separate from their customer-facing web application.  In this repo, you'll find the code that will power their API: starter code and tests built with Node, Express, Mocha, SQLite, and Sequelize.

* Once you’ve cloned, install the node modules: `$ npm install`
* Then, run your application:  `$ npm start`
* To run integration tests, run: `$ npm test`

#### Licensing
All content is licensed under a CC­BY­NC­SA 4.0 license.
All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
