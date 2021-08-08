import { Drawer } from 'antd'
export default({open,setOpen}:{open:boolean,setOpen:(open:boolean)=>void}) => {
    return <Drawer visible={open} onClose={()=>setOpen(false)} width={'100%'}>
        <h1>Project Modal</h1>
    </Drawer>
}