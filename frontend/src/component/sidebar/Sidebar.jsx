import './sidebar.scss'
import logo from '../../assets/logo.svg'
import arrow from '../../assets/logos/arrow.svg'
import addProjects from '../../assets/logos/addProjects.svg'
import { sidebarMenuItem } from './sidebarConstants'
import SidebarHandler from './SidebarFunctions.jsx'
import AddEditProject from '../ home/homeComponents/AddEditProjectModal.jsx'
import './sidebar.responsive.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Sidebar = ({ updateProject }) => {
  const {
    isSidebar,
    setIsSidebar,
    isModalOpen,
    addProject,
    newProject,
    setNewProject,
    setIsModalOpen,
    projects,
    inviteProjects,
    handleProjectDetails,
    projectLoader,
  } = SidebarHandler(updateProject)

  return (
    <>
      {isSidebar ? (
        <div className={`sidebar ${isSidebar ? 'sidebar--open' : ''}`}>
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
          {/* <div className='sidebarMenu'>
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
          </div> */}
          <div className='myProjectMenu'>
            <div className='header'>
              <h2>MY PROJECTS</h2>
              <AddEditProject
                title='Create Project'
                fields={[
                  {
                    label: 'Add Title',
                    placeholder: 'Enter Title',
                    value: newProject.title,
                    onChange: (val) =>
                      setNewProject((prev) => ({ ...prev, title: val })),
                  },
                ]}
                onSave={addProject}
                onCancel={() => {
                  setNewProject({ title: '', description: '' })
                  // optional: reset form
                }}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                onColorChange={(color) => {
                  setNewProject((prev) => ({ ...prev, color }))
                }}
              />
              <button onClick={() => setIsModalOpen(true)}>
                <img src={addProjects} alt='' />
              </button>
            </div>
            <div className='myProjectItems'>
              {projectLoader ? (
                <>
                  <Skeleton count={5} />
                </>
              ) : projects?.length === 0 ? (
                <p className='noProjectText'>No Projects Found</p>
              ) : (
                <>
                  {projects?.length === 0 && (
                    <p className='noProjectText'>No Projects Found</p>
                  )}
                  {projects?.map((item, index) => (
                    <div
                      onClick={() => handleProjectDetails(item._id)}
                      className='myProjectItem'
                      key={index}
                    >
                      <span
                        className='myProjectColor'
                        style={{
                          backgroundColor: item.color,
                        }}
                      ></span>
                      <p className='myProjectText'>{item?.title}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* ---------------Shared with Me------------------- */}
          {inviteProjects?.length > 0 && (
            <div className='myProjectMenu'>
              <div className='header'>
                <h2>Shared with Me</h2>
              </div>
              <div className='myProjectItems'>
                {inviteProjects?.map((item, index) => (
                  <div
                    onClick={() => handleProjectDetails(item._id)}
                    className='myProjectItem'
                    key={index}
                  >
                    <span
                      className='myProjectColor'
                      style={{
                        backgroundColor: item.color,
                      }}
                    ></span>
                    <p className='myProjectText'>{item?.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
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
