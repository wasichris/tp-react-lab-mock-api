const mockHelper = require('../utils/mockHelper')
const faker = require('faker')
const express = require('express')
const router = express.Router()

router.get('/alive', (req, res) => {
  res.send('Lab alive')
})

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

router.post('/redirect-sample', function (req, res) {
  // response
  setTimeout(() => {
    res.status(302).redirect('http://localhost:3000/landing')
  }, 200)
})

router.post('/my-data-redirect-sample', function (req, res) {
  // response
  setTimeout(() => {
    res.status(302).redirect('http://localhost:4200/dev/my-data')
  }, 200)
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

  // 加入 cookie 做測試
  res.cookie('refreshToken', 'ooxooxoxoxoxoxo', {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
    // sameSite: 'none',
    secure: true
  })

  // response
  setTimeout(() => {
    res.json(data)
  }, 500)
})

router.post('/uploadImage', function (req, res) {
  const data = {
    isSuccess: true,
    msg: 'ok lah~'
  }

  // response
  setTimeout(() => {
    res.json(data)
  }, 500)
})

module.exports = router
