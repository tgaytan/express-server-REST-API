const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{
          model: Product, through: ProductTag, as: 'tag_product'
        }]
    });
    res.status(200).json(tagData);
  } catch(err) {
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      where: {
        id: req.params.id
      },
      include: [{
          model: Product, through: ProductTag, as: 'tag_product'
        }]
    });
    res.status(200).json(tagData);
  } catch(err) {
    res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json(newTag)
  } catch(err) {
    res.status(400).json(err)
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const newTag = req.body.tag_name
    const tagData = await Tag.update( {tag_name: newTag}, { 
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(tagData)
  } catch(err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(tagData)
  } catch(err) {
    res.status(400).json(err)
  };
});

module.exports = router;
