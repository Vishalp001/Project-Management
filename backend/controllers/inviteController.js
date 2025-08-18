import Invitation from '../models/Invitation.js'
import Project from '../models/Project.js'
import sendEmail from '../utils/sendEmail.js'

export const inviteCollaborator = async (req, res) => {
  try {
    const { email, projectId, invitedBy } = req.body
    console.log(email, projectId, invitedBy, `inviteCollaborator`)
    const existing = await Invitation.findOne({
      email,
      project: projectId,
      status: 'pending',
    })
    console.log(existing, 'existing invitation')
    if (existing)
      return res.status(400).json({ message: 'Invitation already sent' })

    const invitation = await Invitation.create({
      email,
      project: projectId,
      invitedBy,
    })
    console.log(invitation, 'invitation')

    const inviteLink = `${process.env.CLIENT_URL}/accept-invite/${email}`

    console.log(inviteLink, 'invite link')
    const addMember = await Project.findById(projectId)
    addMember.members.push(invitation._id)
    await addMember.save()

    const html = `<div style="width: 100%">
      <p>
        <strong>Hello!</strong> <br />
        You have been invited by Project Owner to join the Project Name. Project
        Manager is a simple and beautiful way to plan and track your work.
      </p>
      <div
        style="
          margin-top: 20px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
       <a style="text-decoration: none; color: #fff" href="${inviteLink}">
        <button
          style="
            border: none;
            outline: none;
            font-weight: 500;
            padding: 10px 20px;
            background: #3a95c9;
            color: #fff;
            border-radius: 5px;
            height: 48px;
            width: 150px;
          "
        >
            Join Project
        </button>
          </a>
      </div>
    </div>`

    await sendEmail(email, 'Project Invitation', html)

    res
      .status(200)
      .json({ message: 'Invitation sent successfully', data: res.data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error sending invitation' })
  }
}

export const acceptInvitation = async (req, res) => {
  const user = req.user

  const invitation = await Invitation.findOne({
    email: user.email,
    status: 'pending',
  })
  if (!invitation) {
    return res.status(400).json({ message: 'Invalid or expired email' })
  }

  const project = await Project.findById(invitation.project)
  if (!project.members.includes(user._id)) {
    project.members.push(user._id)
    await project.save()
  }

  invitation.status = 'accepted'
  await invitation.save()

  res.status(200).json({ message: 'Successfully joined the project' })
}
