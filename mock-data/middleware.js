module.exports = (request,response,next) => {
    if (request.method === 'POST' && request.path === '/login') {
        if (request.body.username==='闫梅琴'&&request.body.password==='123') {
            return response.status(200).json({
                username:request.body.username,
                token:Math.random()
            })
        }
        return response.status(400).json({error:'用户名或者密码错误'})
    }
    next()
}