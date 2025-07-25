import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createTask,
  updateTaskStatus,
  getTaskByProjectIdApi,
} from '../../api/task.api'
import {
  deletProjectApi,
  getOwnerProjectApi,
  updateProjectApi,
} from '../../api/apiProject'
const HomeHandler = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const navigate = useNavigate()
  const { projectId } = useParams()
  const [updateProject, setUpdateProject] = useState(null)
  const [isDeletModalOpen, setIsDeletModalOpen] = useState(false)
  const [isEditModalOpen, setEditIsModalOpen] = useState(false)
  const [getColor, setGetColor] = useState('#eb5e41')

  const initialProjectState = {
    title: '',
    members: [],
    color: getColor,
    tasks: [],
  }
  const [editProject, setEditProject] = useState(initialProjectState)

  const handleColorCode = (data) => {
    setGetColor(data)
    setEditProject((prev) => ({ ...prev, color: data }))
  }

  const [columns, setColumns] = useState({
    'To Do': [],
    'In Progress': [],
    Done: [],
  })

  const [activeId, setActiveId] = useState(null)

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = async (event) => {
    const { over } = event
    if (!over || !activeId) return

    const from = Object.keys(columns).find((key) =>
      columns[key].some((item) => item._id === activeId)
    )

    const card = columns[from].find((item) => item._id === activeId)

    if (from === over.id || !card) {
      setActiveId(null)
      return
    }

    // Update local state
    setColumns((prev) => {
      const updated = { ...prev }
      updated[from] = updated[from].filter((item) => item._id !== activeId)
      updated[over.id] = [...updated[over.id], { ...card, status: over.id }]
      return updated
    })

    // 🔥 Persist to backend
    try {
      await updateTaskStatus(activeId, over.id)
    } catch (err) {
      console.error('Failed to update task status:', err)
    }

    setActiveId(null)
  }

  const [newCard, setNewCard] = useState({
    title: '',
    description: '',
    priority: 'Low',
    project: '',
    assignedUsers: [],
    owner: '',
  })

  // If you want to populate the columns:
  const populateColumn = (res) => {
    const updatedColumns = {
      'To Do': [],
      'In Progress': [],
      Done: [],
    }
    res.data.forEach((task) => {
      if (updatedColumns[task.status]) {
        updatedColumns[task.status].push(task)
      }
    })
    setColumns(updatedColumns)
  }

  const addCard = async () => {
    setNewCard((prev) => ({ ...prev, project: projectId }))
    const newCardData = {
      ...newCard,
      project: projectId,
      owner: user?._id,
    }
    const res = await createTask(newCardData)
    if (res.status === 201) {
      const createdCard = res.data
      const status = createdCard.status || 'To Do'
      setColumns((prev) => ({
        ...prev,
        [status]: [...prev[status], createdCard],
      }))
    }
  }

  useEffect(() => {
    const getTaskByProjectId = async () => {
      try {
        const res = await getTaskByProjectIdApi(projectId)
        populateColumn(res)
      } catch (error) {
        console.error('Failed to fetch tasks', error)
        setColumns({
          'To Do': [],
          'In Progress': [],
          Done: [],
        })
      }
    }

    if (projectId) getTaskByProjectId()
  }, [projectId, updateProject])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [projectDetails, setProjectDetails] = useState(null)

  const openEditProjectModal = async () => {
    if (!projectDetails) return
    setEditIsModalOpen(true)
    const project = projectDetails || {}
    setEditProject({
      title: project?.title ?? '',
      color: project?.color ?? '#eb5e41',
    })
  }

  const handleEditProject = async () => {
    try {
      const res = await updateProjectApi(projectId, editProject)
      console.log(res, 'Project updated successfully')
      if (res.status === 200) {
        setProjectDetails(res.data)
        setEditIsModalOpen(false)
      }
    } catch (error) {
      console.log(error, 'Error editing project')
    }
  }

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/projects/${projectId}`
        )
        // console.log(res.data)

        if (res.status === 200) {
          setProjectDetails(res.data)
        }
      } catch (err) {
        console.error('Error fetching project:', err)
        setProjectDetails(null)
        setUpdateProject(null)
      }
    }

    if (projectId) {
      fetchProjectDetails()
    }
  }, [projectId])

  const handleDeletProject = async (id) => {
    try {
      await deletProjectApi(id)
      const response = await getOwnerProjectApi(user?._id)

      if (response.status === 200) {
        const remainingProject = response.data
        setUpdateProject(response.data)
        if (response.data.length > 0) {
          navigate(`/${remainingProject[0]._id}`)
        } else {
          console.log('No Project Found')
          setUpdateProject(null)
        }
      }
    } catch (err) {
      console.error('Error deleting project:', err)
      setProjectDetails(null)
      setUpdateProject(null)
    }
  }

  return {
    handleDragStart,
    handleDragEnd,
    addCard,
    handleDeletProject,
    projectDetails,
    isModalOpen,
    setIsModalOpen,
    updateProject,
    newCard,
    setNewCard,
    columns,
    isDeletModalOpen,
    setIsDeletModalOpen,
    isEditModalOpen,
    setEditIsModalOpen,
    openEditProjectModal,
    handleEditProject,
    handleColorCode,
    editProject,
    setEditProject,
  }
}

export default HomeHandler
