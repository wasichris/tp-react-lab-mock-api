/* eslint-disable camelcase */
const mockHelper = require('../utils/mockHelper')
const faker = require('faker')
const express = require('express')
const router = express.Router()

router.get('/alive', (req, res) => {
  res.send('charge api alive')
})

const responseData = {
  status: '00000',
  message: '',
  data: {}
}

router.get('/authorization', function (req, res) {
  const { appId, appKey, memberToken } = req.query

  const data = {
    ...responseData,
    data: {
      accessToken: `${(new Date()).toDateString()} - ${appId}:${appKey} - ${memberToken}`
      // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDRlOGQ5YTA2MWMxYTJjMDIxY2JlMTgiLC JpYXQiOjE1NjU4NTczMjAsImV4cCI6MTU2NTk0MzcyMH0.GQVyQJLmwXd2jQZsjZ8n6cAWD0HQGj vlp2Mk8kAsGy8'
    }
  }

  // response
  res.json(data)
})

router.post('/chargingmap', function (req, res) {
  const { longitude, latitude, radius } = req.body
  const dataAmount = faker.helpers.randomize([2, 3, 4, 5])
  const data = {
    ...responseData,
    data: mockHelper.genDatas(dataAmount, () => {
      return {
        locationId: '充電場域編號-' + radius,
        name: '充電場域名稱',
        city: '充電場域縣市',
        state: '充電場域行政區',
        addr: '充電場域地址',
        directions: '前往充電場域指引說明',
        lat: '充電場域緯度-' + latitude,
        lon: '充電場域經度-' + longitude,
        operator: '充電場域營運商',
        phone: '充電場域聯絡電話',
        openningStatus: 1,
        images: ['url-a', 'url-b'],
        remark: '其他備註說明',
        parkingType: '充電場域類型',
        fee: [{
          name: '費率',
          unit: '費率單位',
          remark: '費率說明'
        }],
        openingTimes: [{
          weekday: '充電場域正常營業時間-星期',
          opening_begin: '充電場域正常營業時間-開始時間 ',
          opening_end: '充電場域正常營業時間-結束時間'
        }],
        evse: [{
          evseId: '充電樁編號',
          evseStatus: 0,
          floorLevel: '充電樁所在樓層',
          parkingInfo: '停車格訊息',
          remark: '其他備註說明',
          connectors: [{
            connectorId: '充電槍編號',
            connectorStatus: 0,
            connectorFormat: 1,
            connectorType: '充電槍類型',
            powerType: 1,
            maxVoltage: '充電槍最大電壓(V)',
            maxAmperage: '充電槍最大電流(A)',
            maxPower: '充電槍最大功率(kw)',
            stopChargingType: 1
          }]
        }]
      }
    })
  }

  // response
  res.json(data)
})

router.get('/start_changing', function (req, res) {
  const { location_id, evse_id, create_date } = req.query

  const data = {
    location_id: '充電站編號-' + location_id,
    location_name: '充電站名稱',
    rate: 22,
    evse_id: '充電樁編號-' + evse_id,
    power_type: '供電類型',
    standard: '標準',
    max_electric_power: 22,
    voltage: 22,
    charge_status: '充電樁狀態-' + create_date
  }

  // response
  res.json(data)
})

module.exports = router
