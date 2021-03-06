/* eslint-disable class-methods-use-this */
import { post, get, put } from '@/lin/plugins/axios'
import Config from '../../config'
import Sse from '../utils/sse'

export default class Notify {
  url = null

  events = null

  sse = null

  constructor(url) {
    this.url = url
  }

  async getEvents() {
    const res = await get('notify/events')
    this.events = res.events
  }

  async initSse() {
    await this.getEvents()
    this.sse = new Sse(Config.baseUrl + this.url, this.events)
  }

  /**
   * 创建events
   * @param {number} group_id
   * @param {Array} events
   */
  async createEvents(group_id, events) {
    const res = await post('notify/events', { group_id, events })
    return res
  }

  /**
   * 更新events
   * @param {number} group_id
   * @param {Array} events
   */
  async updateEvents(group_id, events) {
    const res = await put('notify/events', { group_id, events })
    return res
  }
}
