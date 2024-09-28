/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("77qslah1r0ksorf")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("77qslah1r0ksorf")

  // remove
  collection.schema.removeField("aej9rjlw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "auvblia0",
    "name": "url",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o5xnyiia",
    "name": "name",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "wcoxko9am9veuil",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
