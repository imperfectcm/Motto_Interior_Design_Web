/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wcoxko9am9veuil")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cakwbae0",
    "name": "is_feature_project",
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

  // update
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
})
