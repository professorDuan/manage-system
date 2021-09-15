//模拟发送请求，当执行npm run test会自动到__test__目录下寻找.test.js文件
//setupServer用于创建模拟服务器
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import useHttp from '../custom-hooks/use-http'

const apiUrl = process.env.REACT_APP_API_URL
const server = setupServer()
const http = useHttp()

//jest是React集成最好的一个测试库
//所有测试之前先执行的
beforeAll(() => server.listen())

//每一个测试跑完后，重置mock路由
afterEach(() => server.resetHandlers())

//所有测试跑完后关闭mock路由
afterAll(() => server.close())

//定义测试单元
test('测试useHttp',async() => {
    const path = 'test'
    const mockValue = {value:'这是mock数据'}
    //模拟请求返回的数据
    server.use(
        rest.get(`${apiUrl}/${path}`,(request,response,ctx) => response(ctx.json(mockValue)))
    )
    //预期的数据
    const res = await http(path,{})
    expect(res).toEqual(mockValue)
})