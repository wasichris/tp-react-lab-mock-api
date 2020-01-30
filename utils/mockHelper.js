const map = require('lodash/map')
const range = require('lodash/range')
const random = require('lodash/random')
const get = require('lodash/get')
const padStart = require('lodash/padStart')

module.exports = {
  /**
   * @description 建立陣列物件，可自行定義物件格式與筆數
   * @export utils/mockHelper
   * @param {number} [times=1] 筆數
   * @param {object} fn 產生資料物件的function或資料物件
   * @returns {Array}
   */
  genDatas: (times = 1, fn) => map(range(times), (n) => fn(n)),
  /**
   * @description 由陣列中隨機取得一個項目
   * @export utils/mockHelper
   * @param {Array} arr 要隨機取得一個項目的陣列
   * @returns {object}
   */
  getRandomItem: arr => get(arr, random(arr.length - 1)),
  /**
   * @description 由陣列中隨機取得多個項目
   * @export utils/mockHelper
   * @param {Number} number 取得數量
   * @param {Array} arr 要隨機取得多個項目的陣列
   * @returns {object}
   */
  getRandomItems: (number, arr) => {
    if (number > arr.length) {
      number = arr.length
    }
    const resArray = []
    arr.forEach((value, index) => {
      if (random(0, 1) === 0) return
      if (resArray.length >= number) return false
      resArray.push(value)
    })
    return resArray
  },
  /**
   * @description 產生n張信用卡
   * @export utils/mockHelper
   * @param {Number} number 產生數量
   * @returns {Array}
   */
  makeCreditCard: (number) => {
    const fakeCreditCard = []
    for (let i = 1; i <= number; i++) {
      fakeCreditCard.push('1111-2222-3333-' + padStart(i, 4, '0'))
    }
    return fakeCreditCard
  }

}
