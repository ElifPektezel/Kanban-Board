import React from 'react'

function ElipsisMenu({type, setOpenEditModal, setOpenDeleteModal}) {
  return (
    <div>
        <div className='SelectBoard'>
            <p
            onClick={() => {
setOpenEditModal()
            }}
            >
                Edit {type}
            </p>
            <p   onClick={() => {
                setOpenDeleteModal()
            }}
            >
                Delete {type}
            </p>
        </div>
    </div>
  )
}

export default ElipsisMenu