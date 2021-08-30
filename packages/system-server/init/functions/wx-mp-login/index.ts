import cloud from '@/cloud-sdk'

// 你可以让一个云函数监听 `App:ready` 触发器事件，初始化必要的配置信息(cloud.shared)
const appid = cloud.shared.get('settings.wxmp.appid')     // 微信小程序 AppId
const appsecret = cloud.shared.get('settings.wxmp.appsecret')  // 微信小程序 AppSecret

/**
 * @body string code
 * @returns 
 */
exports.main = async function (ctx) {
  const db = cloud.database()


  const { body } = ctx
  const code = body.code

  // 获取 openid
  const openid = await getOpenId(code)
  if (!openid) {
    return 'invalid code'
  }

  // 根据 openid 获取新用户
  let { data } = await db.collection('users')
    .where({ openid })
    .getOne()


  // 如果用户不存在
  if (!data) {
    // 添加新用户
    await db.collection('users')
      .add({
        openid,
        created_at: Date.now(),
        updated_at: Date.now()
      })

    const r = await db.collection('users')
      .where({ openid })
      .getOne()

    data = r.data
  }

  // 生成 token
  const expire = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
  const token = cloud.getToken({ uid: data._id, exp: expire })
  return {
    uid: data._id,
    access_token: token,
    openid,
    expire
  }
}

/**
 * 获取 openid
 * @param {string} code Then auth code
 * @return {Promise<string>}
 */
async function getOpenId(code) {

  const api_url = `https://api.weixin.qq.com/sns/jscode2session`
  const param = `appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`

  console.log('request url: ', `${api_url}?${param}`)

  const res = await cloud.fetch(`${api_url}?${param}`)

  console.log(res.data)
  // { session_key: string; openid: string } 

  if (res.data.errcode > 0) {
    return null
  }

  return res?.data?.openid
}

