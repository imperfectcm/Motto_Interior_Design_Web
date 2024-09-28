/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("77qslah1r0ksorf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1wbq1lf9",
    "name": "is_cover",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("77qslah1r0ksorf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1wbq1lf9",
    "name": "cover",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
