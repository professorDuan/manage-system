import useQueryParams from './use-queryParams'

export default () => {
    const [{openDialog},setOpenDialog] = useQueryParams(['openDialog'])
    const open = () => setOpenDialog({openDialog:true})
    const close = () => setOpenDialog({openDialog:false})
    return {
        showing:openDialog === 'true',
        open,close
    }
}