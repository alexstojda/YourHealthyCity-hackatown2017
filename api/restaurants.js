const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('list the restaurants here')
})

module.exports = router