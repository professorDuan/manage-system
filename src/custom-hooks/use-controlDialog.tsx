import qs from 'qs'
import useQueryParams from './use-queryParams'

export default () => {
    const [{openDialog,addProject,editProject,id},setOpenDialog] = useQueryParams(['openDialog','addProject','editProject','id'])
    const openAddProject = () => setOpenDialog({openDialog:true,addProject:true})
    const openEditProject = (id?:number) => setOpenDialog({openDialog:true,editProject:true,id})
    const close = () => {
        setOpenDialog({openDialog:undefined})
    }
    return {
        showing:openDialog === 'true',
        id,
        add:addProject,
        edit:editProject,
        openAddProject,
        openEditProject,
        close
    }
}