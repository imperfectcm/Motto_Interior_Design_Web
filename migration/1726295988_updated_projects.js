/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wcoxko9am9veuil")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wcoxko9am9veuil")

  // remove
  collection.schema.removeField("z02gqcsg")

  return dao.saveCollection(collection)
})
