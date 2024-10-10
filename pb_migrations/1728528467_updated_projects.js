/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wcoxko9am9veuil")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wcoxko9am9veuil")

  // remove
  collection.schema.removeField("tci78i3t")

  return dao.saveCollection(collection)
})
