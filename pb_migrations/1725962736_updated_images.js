/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("77qslah1r0ksorf")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("77qslah1r0ksorf")

  // remove
  collection.schema.removeField("taocqmng")

  return dao.saveCollection(collection)
})
