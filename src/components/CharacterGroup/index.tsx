import { Modal } from '@mui/material'
import { useState } from 'react'
import { Character, CharacterInfo } from '@components'

const CharacterGroup = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          p: 1,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto'
        }}
      >
        <CharacterInfo closeIcon={handleClose} />
      </Modal>
      <Character onClick={handleOpen} />
    </div>
  )
}

export default CharacterGroup
