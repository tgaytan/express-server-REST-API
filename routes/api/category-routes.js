const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{
        model: Product
      }]
    });
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(400).json(err);
  };
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ 
        model: Product
      }],
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(400).json(err);
  };
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.name
    });

    res.status(200).json(newCategory);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const newCat = req.body.name;
    const catData = await Category.update( {category_name: newCat}, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(catData);
  } catch(err) {
    res.status(400).json(err);
  };
});

router.delete('/:id', async(req, res) => {
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(catData);
  } catch(err) {
    res.status(400).json(err);
  };
});

module.exports = router;
