import { Drawer } from 'antd'
import { actions } from '../../store/slice/projectsSlice'
import { State } from '../../store'
import { useSelector,useDispatch } from 'react-redux'

export default() => {
    const {open} = useSelector((state:State) => state.projects)
    const dispatch = useDispatch()
    return <Drawer visible={open} onClose={() => dispatch(actions.toggleOpen())} width={'100%'}> 
        <h1>Project Modal</h1>
    </Drawer>
}