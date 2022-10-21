const mockHelper = require('../utils/mockHelper')
const faker = require('faker')
const express = require('express')
const router = express.Router()

router.get("/alive", (req, res) => {
  res.send("charge api alive");
});

router.post('/getContacts', function (req, res) {
  const { contactId } = req.body
  const dataAmount = faker.helpers.randomize([2, 3, 4, 5])
  const data = {
    id: contactId,
    contacts: mockHelper.genDatas(dataAmount, () => {
      return {
        name: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        isMarried: mockHelper.getRandomItem([true, false])
      }
    })
  }

  // response
  res.json(data)
})


module.exports = router
