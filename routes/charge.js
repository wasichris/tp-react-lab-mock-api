const mockHelper = require('../utils/mockHelper')
const faker = require('faker')
const express = require('express')
const router = express.Router()

router.get("/alive", (req, res) => {
  res.send("charge api alive");
});

const responseData = {
  status: '00000',
  message: '',
  data: {}
}

router.post('/getAuthToken', function (req, res) {

  const data = {
    ...responseData, data: {
      token: (new Date()).toDateString()
      // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDRlOGQ5YTA2MWMxYTJjMDIxY2JlMTgiLC JpYXQiOjE1NjU4NTczMjAsImV4cCI6MTU2NTk0MzcyMH0.GQVyQJLmwXd2jQZsjZ8n6cAWD0HQGj vlp2Mk8kAsGy8'
    }
  }

  // response
  res.json(data)
})

router.post('/charging_map', function (req, res) {
  const { longitude, latitude, radius } = req.body
  const dataAmount = faker.helpers.randomize([2, 3, 4, 5])
  const data = {
    ...responseData,
    data: mockHelper.genDatas(dataAmount, () => {
      return {
        id: '充電站編號',
        open_type: {
          id: '開放類型編號',
          name: '開放類型名稱'
        },
        name: "充電站名稱",
        address: "充電站地址",
        city: "縣市",
        state: "市區",
        coordinates: {
          latitude: '緯度',
          longitude: '經度',
        },
        ac_info: {
          all: 10,
          available: 7,
          unavailable: 3
        },
        dc_info: {
          all: 5,
          available: 4,
          unavailable: 1
        },
        opening: {
          status: 1,
          start_time: '08:00:00',
          end_time: '23:00:00'
        },
        parking_fee: '150 元/次',
        parking_space: '平面 55-65 停車位',
        msp: '合作營運商',
        contact_number: '連絡電話',
        rate: '費率',
        rate_note: '費率額外備註',
        images: ['m1', 'm2'],
        evses: [
          {
            evse_id: "充電樁編號",
            vendor: "Lexus/Toyota",
            floor_level: "樓層",
            availability: "充電樁狀態 AVAILABLE :可使用 UNAVAILABLE:不可使",
            images: "充電樁相關照片 url",
            connectors: [
              {
                connector_id: "充電槍編號",
                standard: "標準",
                power_type: "供電類型",
                max_electric_power: "最大輸出電",
                voltage: "電壓",
                amperage: "安培數",
                format: "規格",
                charge_status: "AVAILABLE",
              }
            ],
            charging_type: 1
          }
        ],
        additional_remarks: '補充說明',
        idle_fee: '50 元 / 10 分鐘'

      }
    })
  }

  // response
  res.json(data)
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
  res.json(data)
})


module.exports = router
