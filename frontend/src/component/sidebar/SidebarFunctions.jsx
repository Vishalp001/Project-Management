import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SidebarHandler = (updateProject) => {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const [projects, setProjects] = useState([])

  const fetchOwnerProjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/projects/owner/${user?._id}`
      )
      if (response.status === 200) {
        setProjects(response.data)
        navigate(`/${response.data[0]._id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (user?._id) {
      fetchOwnerProjects()
    }
  }, [user?._id])

  useEffect(() => {
    setProjects(updateProject)
  }, [updateProject])

  const [isSidebar, setIsSidebar] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [getColor, setGetColor] = useState('#eb5e41')

  const initialProjectState = {
    title: '',
    owner: user?._id,
    members: [],
    color: getColor,
    tasks: [],
  }

  const [newProject, setNewProject] = useState(initialProjectState)

  const handleColorCode = (data) => {
    setGetColor(data)
    setNewProject((prev) => ({ ...prev, color: data }))
  }

  const addProject = async () => {
    const response = await axios.post(
      'http://localhost:5001/api/projects/',
      newProject
    )
    if (response.status === 201) {
      setNewProject(initialProjectState)
      setIsModalOpen(false)
      fetchOwnerProjects()
    } else {
      console.error('Failed to create project:', response.data)
    }
  }

  const handleProjectDetails = (projectId) => {
    navigate(`/${projectId}`)
  }

  return {
    isSidebar,
    setIsSidebar,
    isModalOpen,
    handleColorCode,
    addProject,
    newProject,
    setNewProject,
    setIsModalOpen,
    projects,
    handleProjectDetails,
  }
}

export default SidebarHandler
