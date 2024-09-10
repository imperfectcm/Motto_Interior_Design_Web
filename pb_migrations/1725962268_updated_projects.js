/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wcoxko9am9veuil")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cakwbae0",
    "name": "feature_project",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wcoxko9am9veuil")

  // remove
  collection.schema.removeField("cakwbae0")

  return dao.saveCollection(collection)
})
