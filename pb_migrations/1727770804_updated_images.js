/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("77qslah1r0ksorf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i661fa5m",
    "name": "key",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("77qslah1r0ksorf")

  // remove
  collection.schema.removeField("i661fa5m")

  return dao.saveCollection(collection)
})
