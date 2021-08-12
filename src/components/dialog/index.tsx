import { Drawer } from 'antd'
import useControlDialog from '../../custom-hooks/use-controlDialog'

export default() => {
    const { showing,close } = useControlDialog()
    return <Drawer visible={showing} onClose={close} width={'100%'}>
        <h1>Project Modal</h1>
    </Drawer>
}