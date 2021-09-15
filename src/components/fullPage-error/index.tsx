import { Typography } from "antd"

export default ({error}:{error:Error|null}) => {
    return <div style={{ height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center' }}>
        <Typography.Text>{error?.message}</Typography.Text>
    </div>
}