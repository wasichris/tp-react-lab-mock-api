const mockHelper = require('../utils/mockHelper')
const faker = require('faker')
const express = require('express')
const router = express.Router()

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
  setTimeout(() => {
    res.json(data)
  }, 1000)
})

router.post('/login', function (req, res) {
  const { id, pcode } = req.body
  const isSuccessLogin = pcode === '111'
  const data = {
    isSuccess: isSuccessLogin,
    msg: isSuccessLogin ? `${id}, 登入成功` : `${id}, 密碼錯誤!!`
  }

  // 測試錯誤發生的情境
  // res.status(500).json('Server Error')

  // response
  setTimeout(() => {
    res.json(data)
  }, 500)
})

module.exports = router
