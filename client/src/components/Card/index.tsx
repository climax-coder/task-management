import { FaTrash } from "react-icons/fa"
import { FiEdit } from "react-icons/fi"
import { CardProps } from "../../constants/types"
import { CardHeader } from "../../constants/content"
import { CardStyle } from "../../constants/styles"
import cx from "clsx"

const CardComponent: React.FC<CardProps> = ({
  data,
  deleteTask,
  updateTask,
}) => {
  const { title, description, priority, _id } = data
  return (
    <div className={cx(CardStyle.container)}>
      <div className="col-span-4">
        <div className={cx(CardStyle.titleColor)}>{CardHeader.Task}</div>
        <div className=" break-words">{title}</div>
      </div>
      <div className="col-span-4">
        <div className={cx(CardStyle.titleColor)}>{CardHeader.Description}</div>
        <div>{description}</div>
      </div>
      <div className="col-span-2">
        <div className={cx(CardStyle.titleColor)}>{CardHeader.Priority}</div>
        <div
          className={
            priority === "high"
              ? "text-second"
              : priority === "medium"
              ? "text-yellow-600"
              : "text-green-600"
          }
        >
          {priority.toUpperCase()}
        </div>
      </div>
      <div className={cx(CardStyle.actionContainer)}>
        <FiEdit
          className="text-basic cursor-pointer"
          onClick={() => updateTask(_id)}
        />
        <FaTrash
          className="text-red-600 cursor-pointer"
          onClick={() => deleteTask(_id)}
        />
      </div>
    </div>
  )
}

export default CardComponent
