import crypto from 'crypto'
import Invitation from '../models/Invitation.js'
import User from '../models/User.js'
import Project from '../models/Project.js'
import sendEmail from '../utils/sendEmail.js'

export const inviteCollaborator = async (req, res) => {
  try {
    const { email, projectId, invitedBy } = req.body

    const token = crypto.randomBytes(20).toString('hex')

    const existing = await Invitation.findOne({
      email,
      project: projectId,
      status: 'pending',
    })
    if (existing)
      return res.status(400).json({ message: 'Invitation already sent' })

    const invitation = await Invitation.create({
      email,
      project: projectId,
      token,
      invitedBy,
    })

    const inviteLink = `${process.env.CLIENT_URL}/accept-invite/${token}`

    // const addMember = await Project.findById(projectId)
    // addMember.members.push(invitation._id)
    // await addMember.save()

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
  const { token, email } = req.body

  try {
    const invitation = await Invitation.findOne({
      token,
    })
    if (!invitation) {
      return res.status(400).json({ message: 'Invalid or expired token' })
    }

    //  Find the user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        message:
          'User not found. Please register first before accepting invite.',
      })
    }

    const addMember = await Project.findById(invitation.project)
    addMember.members.push(user._id)
    await addMember.save()

    invitation.status = 'accepted'
    await invitation.save()

    res
      .status(200)
      .json({ message: 'Successfully joined the project', invitation })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// GET /accept-invite/:token
export const getInviteUserDetails = async (req, res) => {
  try {
    const { token } = req.params
    const { email } = req.body

    const invitation = await Invitation.findOne({
      token,
    }).populate('project invitedBy')

    if (!invitation) {
      return res.status(400).json({
        message:
          '😬 This invite is playing hide and seek… but it’s gone. Ping the project owner for a new one!',
      })
    }

    // check if logged-in user email matches the invitation email
    if (invitation.email !== email) {
      return res.status(403).json({
        message: `This invite was sent to ${invitation.email}, but you’re logged in as ${email}. Please log in with the correct account to accept this invite.`,
        email: invitation.email,
      })
    }

    if (invitation.status === 'accepted') {
      return res.status(200).json({
        message:
          '✅ You’ve already joined this project. No need to accept the invite again!',
        status: invitation.status,
      })
    }

    res.status(200).json({
      message: 'User fetch successful',
      invitation,
      status: invitation.status,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
