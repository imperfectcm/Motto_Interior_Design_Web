/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const snapshot = [
    {
      "id": "wcoxko9am9veuil",
      "created": "2024-09-04 09:13:06.424Z",
      "updated": "2024-10-10 02:47:47.069Z",
      "name": "projects",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "ymettj9n",
          "name": "name",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "w5ivsp8s",
          "name": "year",
          "type": "number",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        },
        {
          "system": false,
          "id": "x9f3nyh3",
          "name": "location",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "dabqffzu",
          "name": "apartment_name",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "jixzpifw",
          "name": "size",
          "type": "number",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        },
        {
          "system": false,
          "id": "m4agtuza",
          "name": "household_size",
          "type": "number",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        },
        {
          "system": false,
          "id": "4t4rektl",
          "name": "description",
          "type": "editor",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "convertUrls": false
          }
        },
        {
          "system": false,
          "id": "cakwbae0",
          "name": "is_feature_project",
          "type": "bool",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "z02gqcsg",
          "name": "feature_id",
          "type": "number",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        },
        {
          "system": false,
          "id": "tci78i3t",
          "name": "display_id",
          "type": "number",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "77qslah1r0ksorf",
      "created": "2024-09-04 09:16:15.940Z",
      "updated": "2024-10-07 12:31:48.743Z",
      "name": "images",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "o5xnyiia",
          "name": "name",
          "type": "relation",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "wcoxko9am9veuil",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "auvblia0",
          "name": "url",
          "type": "url",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "exceptDomains": [],
            "onlyDomains": []
          }
        },
        {
          "system": false,
          "id": "taocqmng",
          "name": "sequence",
          "type": "number",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        },
        {
          "system": false,
          "id": "1wbq1lf9",
          "name": "is_cover",
          "type": "bool",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "aej9rjlw",
          "name": "cover_id",
          "type": "number",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": false
          }
        },
        {
          "system": false,
          "id": "i661fa5m",
          "name": "key",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
