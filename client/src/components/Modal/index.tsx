import React, { useEffect, useState } from "react"
// import { NotificationContainer, NotificationManager } from "react-notifications"
import Modal from "react-modal"
import { ThunkDispatch } from "redux-thunk"
import { useDispatch, useSelector } from "react-redux"
import { AnyAction } from "redux"
import PrimaryButton from "../Button/PrimaryButton"
import { saveTask, fetchTasks, updateTask } from "../../features/taskSlice"
import { ModalProps } from "../../constants/types"
import { modalCustomStyle } from "../../constants/styles"
import { priorityList } from "../../constants/uiOptions"
import { NotificationManager } from "react-notifications"

import {
  ButtonVarient,
  CardHeader,
  ModalTitle,
  ModalValidate,
} from "../../constants/content"
import { ModalStyle } from "../../constants/styles"
import cx from "clsx"

import useScreenSize from "../../hook/useScreenSize"

const ModalComponent: React.FC<{
  handleClose: () => void
  isEditing: boolean
  editTaskId: string | null
}> = (props) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")

  const screenSize = useScreenSize()
  const customStyle = modalCustomStyle(screenSize)

  const [titleError, setTitleError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")
  const [priorityError, setPriorityError] = useState("")

  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>()
  const { tasks } = useSelector((state: ModalProps) => state)

  const handleAdd = async () => {
    setTitleError("")
    setDescriptionError("")
    setPriorityError("")

    let isValid = true
    if (title.trim() === "") {
      setTitleError(ModalValidate.TitleError)
      isValid = false
    }
    if (description.trim() === "") {
      setDescriptionError(ModalValidate.DescriptionError)
      isValid = false
    }
    if (priority === "") {
      setPriorityError(ModalValidate.PriorityError)
      isValid = false
    }

    if (!isValid) {
      return
    }

    const data = {
      title,
      description,
      priority,
    }

    if (props.isEditing && typeof props.editTaskId === "string") {
      try {
        const updateResult = await dispatch(
          updateTask({ id: props.editTaskId, ...data })
        )
        if (updateResult.payload === "success") {
          NotificationManager.success("Task updated successfully", "Success")
          dispatch(fetchTasks())
          props.handleClose()
        }
      } catch (error) {
        console.error("Error occurred while updating the task:", error)
      }
    } else {
      try {
        const saveResult = await dispatch(saveTask(data))
        if (saveResult.payload === "success") {
          NotificationManager.success("Task created successfully", "Success")
          dispatch(fetchTasks())
          props.handleClose()
        }
      } catch (error) {
        console.error("Error occurred while saving the task:", error)
      }
    }
  }

  useEffect(() => {
    if (props.isEditing && typeof props.editTaskId === "string") {
      const taskToEdit = tasks.find((task) => task._id === props.editTaskId)
      if (taskToEdit) {
        setTitle(taskToEdit.title)
        setDescription(taskToEdit.description)
        setPriority(taskToEdit.priority)
      }
    }
  }, [props.isEditing, props.editTaskId, tasks])

  return (
    <div>
      <Modal
        isOpen={true}
        style={customStyle}
        contentLabel="Example Modal"
        onRequestClose={props.handleClose}
      >
        <div className={cx(ModalStyle.container)}>
          <div className={cx(ModalStyle.header)}>
            <h1 className={cx(ModalStyle.title)}>
              {props.isEditing ? ModalTitle.Update : ModalTitle.Add}
            </h1>
            <span
              aria-hidden="true"
              className={cx(ModalStyle.closeIcon)}
              onClick={props.handleClose}
            >
              &times;
            </span>
          </div>
          <div className={cx(ModalStyle.equalCol)}>
            <div className="text-gray-500">{CardHeader.Task}</div>
            <input
              className={cx(ModalStyle.input, titleError && "border-red-500")}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {titleError && (
              <div className={cx(ModalStyle.errorTitle)}>{titleError}</div>
            )}
          </div>
          <div className={cx(ModalStyle.equalCol)}>
            <div className="text-gray-500">{CardHeader.Description}</div>
            <textarea
              className={cx(
                ModalStyle.input,
                descriptionError && "border-red-500"
              )}
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {descriptionError && (
              <div className={cx(ModalStyle.errorTitle)}>
                {descriptionError}
              </div>
            )}
          </div>
          <div className={cx(ModalStyle.equalCol)}>
            <div className="text-gray-500">{CardHeader.Priority}</div>
            <div className="flex gap-5">
              {priorityList.map((item, index) => (
                <span
                  key={index}
                  className={cx(
                    ModalStyle.priority,
                    priority === item.value
                      ? [item.style[0], "text-white"]
                      : item.style[1]
                  )}
                  onClick={() => setPriority(item.value)}
                >
                  {item.label}
                </span>
              ))}
            </div>
            {priorityError && (
              <div className={cx(ModalStyle.errorTitle)}>{priorityError}</div>
            )}
          </div>
          <div className={cx(ModalStyle.buttonContainer)}>
            <PrimaryButton
              varient={
                props.isEditing ? ButtonVarient.Update : ButtonVarient.Add
              }
              handleAdd={handleAdd}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ModalComponent
