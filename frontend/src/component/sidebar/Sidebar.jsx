import React, { useMemo, useState } from 'react'
import './sidebar.scss'
import logo from '../../assets/logo.svg'
import arrow from '../../assets/logos/arrow.svg'
import addProjects from '../../assets/logos/addProjects.svg'
import { myProjectsitems, sidebarMenuItem } from './sidebarConstants'
import Modal from '../../components/modals/Modal'
import { HStack, Text } from '@chakra-ui/react'
import { Colorpicker } from '../../components/ui/color-picker'
const Sidebar = () => {
  const generateRandomColors = (count) => {
    const colors = new Set()
    while (colors.size < count) {
      const color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
      colors.add(color)
    }
    return Array.from(colors)
  }

  const colors = useMemo(() => generateRandomColors(sidebarMenuItem.length), [])

  const [isSidebar, setIsSidebar] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    owner: '',
    members: '',
    color: '',
  })

  const addProject = () => {
    console.log('newProject:- ', newProject)
  }

  return (
    <>
      {isSidebar ? (
        <div className='sidebar'>
          <div className='sidebar__top'>
            <div className='sidebar__logo-container'>
              <img className='sidebar__logo' src={logo} alt='' />
              <h2 className='sidebar__title'>Project M.</h2>
            </div>
            <img
              onClick={() => setIsSidebar(false)}
              className='arrow'
              src={arrow}
              alt=''
            />
          </div>
          <div className='sidebarMenu'>
            {sidebarMenuItem.map((item, index) => (
              <div className='sidebarMenu__item' key={index}>
                <img
                  className='sidebarMenu__icon'
                  src={item.icon}
                  alt={item.text}
                />
                <p className='sidebarMenu__text'>{item.text}</p>
              </div>
            ))}

            <div className='hrLine' />
          </div>
          <div className='myProjectMenu'>
            <div className='header'>
              <h2>MY PROJECTS</h2>
              <Modal
                title='Create Project'
                fields={[
                  {
                    label: 'Add Title',
                    placeholder: 'Enter Title',
                    value: newProject.title,
                    onChange: (val) =>
                      setNewProject((prev) => ({ ...prev, title: val })),
                  },
                  {
                    label: 'Add Description',
                    placeholder: 'Enter Description',
                    value: newProject.description,
                    type: 'textarea',
                    onChange: (val) =>
                      setNewProject((prev) => ({ ...prev, description: val })),
                  },
                ]}
                onSave={addProject}
                onCancel={() => {
                  setNewProject({ title: '', description: '' })
                  // optional: reset form
                }}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
              >
                <Text fontWeight={'medium'} mb={2}>
                  Add Priority
                </Text>
                <HStack>
                  <Colorpicker />
                </HStack>
              </Modal>
              <button onClick={() => setIsModalOpen(true)}>
                <img src={addProjects} alt='' />
              </button>
            </div>
            <div className='myProjectItems'>
              {myProjectsitems.map((item, index) => (
                <div className='myProjectItem' key={index}>
                  <span
                    className='myProjectColor'
                    style={{
                      backgroundColor: colors[index],
                    }}
                  ></span>
                  <p className='myProjectText'>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='sidebarClosed'>
          <div className='sidebar__top'>
            <div className='sidebar__logo-container'>
              <img className='sidebar__logo' src={logo} alt='' />
            </div>
            <img
              onClick={() => setIsSidebar(true)}
              className='arrow'
              src={arrow}
              alt=''
            />
          </div>
          <div className='sidebarMenu'>
            {sidebarMenuItem.map((item, index) => (
              <img
                key={index}
                className='sidebarMenu__icon'
                src={item.icon}
                alt={item.text}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar
