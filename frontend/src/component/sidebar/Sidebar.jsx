import './sidebar.scss'
import logo from '../../assets/logo.svg'
import arrow from '../../assets/logos/arrow.svg'
import addProjects from '../../assets/logos/addProjects.svg'
import { sidebarMenuItem } from './sidebarConstants'
import SidebarHandler from './SidebarFunctions.jsx'
import AddEditProject from '../modals/addEditProject/AddEditProject.jsx'
const Sidebar = ({ updateProject }) => {
  const {
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
  } = SidebarHandler(updateProject)
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
                colorCode={handleColorCode}
              />
              <button onClick={() => setIsModalOpen(true)}>
                <img src={addProjects} alt='' />
              </button>
            </div>
            <div className='myProjectItems'>
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
