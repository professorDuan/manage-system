import { renderHook,act } from '@testing-library/react-hooks'
import useAsync from "../custom-hooks/use-async"

const defaultState:ReturnType<typeof useAsync> = {
    data:null,
    error:null,
    status:'initial',
    isInitial:true,
    isLoading:false,
    isSuccess:false,
    isError:false,
    run:expect.any(Function),
    setRes:expect.any(Function),
    setSuccessState:expect.any(Function),
    setErrorState:expect.any(Function),
}

const loadingStatus:ReturnType<typeof useAsync> = {
    ...defaultState,
    status:'loading',
    isLoading:true,
    isInitial:false
}

const successStatus:ReturnType<typeof useAsync> = {
    ...defaultState,
    status:'success',
    isInitial:false,
    isSuccess:true
}

//测试Hook
test('测试useAsync',async() => {
    //在renderHook里执行自定义hook
    const { result } = renderHook(() => useAsync())
    //测试默认状态是否一致
    expect(result.current).toEqual(defaultState)

    let resolve:any,reject
    const promise = new Promise((res,rej) => {
        resolve = res
        reject = rej
    })

    let p:Promise<unknown>
    //需要更改组件状态的需要写在act中
    act(() => {
        p = result.current.run(promise)
    })
    //刚执行run时是同步的，测试loading状态，此时promise是pending的
    expect(result.current).toEqual(loadingStatus)

    const value = 'success'
    await act(async() => {
        resolve(value)
        await p
    })
    expect(result.current).toEqual({
        ...successStatus,
        data:value
    })
})