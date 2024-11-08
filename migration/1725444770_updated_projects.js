/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wcoxko9am9veuil")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x9f3nyh3",
    "name": "location",
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
  const collection = dao.findCollectionByNameOrId("wcoxko9am9veuil")

  // remove
  collection.schema.removeField("x9f3nyh3")

  return dao.saveCollection(collection)
})
