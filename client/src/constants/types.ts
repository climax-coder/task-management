export interface TaskProps {
  isLoading: boolean
  tasks: []
  setting: {
    searchKey: string
    page: number
    perPage: number
    sortKey: string
    sortDir: string
  }
  totalCount: number
  error: string
  toggle: boolean
}

export interface IconButtonProps {
  varient: string
  handleClick: () => void
  children: React.ReactNode
}

export interface CardProps {
  data: {
    _id: string
    title: string
    description: string
    priority: string
  }
  deleteTask: (_id: string) => void
  updateTask: (_id: string) => void
}

interface Task {
  _id: string
  title: string
  description: string
  priority: string
  created: string
}

export interface ModalProps {
  tasks: Task[]
}
