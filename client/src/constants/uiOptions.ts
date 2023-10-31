export const sortBy = [
  { label: "Title", value: "title" },
  { label: "Description", value: "description" },
  { label: "Priority", value: "priority" },
]

export const tasksPerPage = [
  { label: 5, value: 5 },
  { label: 10, value: 10 },
  { label: 30, value: 30 },
  { label: 50, value: 50 },
]

export const priorityList = [
  {
    label: "High",
    value: "high",
    style: ["bg-second border-second", "border-second text-second"],
  },
  {
    label: "Medium",
    value: "medium",
    style: [
      "bg-yellow-600 border-yellow-600",
      "border-yellow-600 text-yellow-600",
    ],
  },
  {
    label: "Low",
    value: "low",
    style: ["bg-green-600 border-green-600", "border-green-600 text-green-600"],
  },
]
