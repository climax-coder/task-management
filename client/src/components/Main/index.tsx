import React, { useEffect, useState } from "react"
import { ThunkDispatch } from "redux-thunk"
import { useDispatch, useSelector } from "react-redux"
import { AnyAction } from "redux"
import CardComponent from "../Card"
import SettingComponent from "../Setting"
import IconButton from "../Button/IconButton"
import { FaPlus } from "react-icons/fa"
import ModalComponent from "../Modal"
import PaginationComponent from "../Pagination"
import { fetchTasks, resetSetting, deleteTasks } from "../../features/taskSlice"
import { TaskProps } from "../../constants/types"
import { tasksPerPage } from "../../constants/uiOptions"
import { ButtonVarient, Setting } from "../../constants/content"
import { MainStyle, CardStyle } from "../../constants/styles"
import { SpinnerComponent } from "../Spinner"
import { NotificationContainer, NotificationManager } from "react-notifications"
import cx from "clsx"
import "react-notifications/lib/notifications.css"

const MainComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editTaskId, setEditTaskId] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>()
  const { tasks, totalCount, setting } = useSelector(
    (state: TaskProps) => state
  )

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsEditing(false)
  }

  const handlePageChange = (newPage: number) => {
    const newSetting = { ...setting, page: newPage }
    dispatch(resetSetting(newSetting))
  }

  const handleChangePerPage = (e: any) => {
    const newPerPage = Number(e.target.value)
    const newSetting = { ...setting, perPage: newPerPage }
    dispatch(resetSetting(newSetting))
  }

  const deleteTask = async (id: string) => {
    setIsLoading(true)
    try {
      await dispatch(deleteTasks(id))
      if (totalCount > 0) {
        const newPage = Math.ceil((totalCount - 1) / setting.perPage)
        const reset = { page: newPage }
        dispatch(resetSetting(reset))
      }
      NotificationManager.success("Task deleted successfully", "Success")
    } finally {
      setIsLoading(false)
    }
  }

  const updateTask = (id: string) => {
    setIsEditing(true)
    setEditTaskId(id)
    setIsModalOpen(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        await dispatch(fetchTasks())
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dispatch, setting])

  return (
    <div className={cx(MainStyle.container)}>
      <NotificationContainer />
      <div className="my-4">
        <IconButton varient={ButtonVarient.AddTask} handleClick={openModal}>
          <FaPlus />
        </IconButton>
      </div>
      <SettingComponent />
      {isLoading ? (
        <div className="flex justify-center py-8">
          <SpinnerComponent />
        </div>
      ) : (
        <div className={cx(MainStyle.cardContainer)}>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <CardComponent
                key={index}
                data={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))
          ) : (
            <div className={cx(MainStyle.noResult)}>{Setting.NoResult}</div>
          )}
        </div>
      )}
      {totalCount > 0 && (
        <div className={cx(MainStyle.pageContainer)}>
          <div className="sm:flex hidden gap-3 items-center">
            <select
              className={cx(MainStyle.perPage)}
              onChange={handleChangePerPage}
            >
              {tasksPerPage.map((item, index) => (
                <option
                  key={index}
                  value={item.value}
                  className="text-gray-600"
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <PaginationComponent
            totalPage={totalCount}
            perPage={setting.perPage}
            page={setting.page}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      {isModalOpen && (
        <ModalComponent
          handleClose={closeModal}
          isEditing={isEditing}
          editTaskId={editTaskId}
        />
      )}
    </div>
  )
}

export default MainComponent
