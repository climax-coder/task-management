import * as React from "react"
import { Stack } from "@mui/material"
import Pagination from "@mui/material/Pagination"

const PaginationComponent: React.FC<{
  totalPage: number
  perPage: number
  page: number
  onPageChange: (page: number) => void
}> = ({ totalPage, page, perPage, onPageChange }) => {
  const count = Math.ceil(totalPage / perPage)

  return (
    <div className="flex justify-center">
      <Stack spacing={2}>
        <Pagination
          defaultPage={1}
          siblingCount={0}
          count={count}
          size="medium"
          page={page}
          onChange={(_, page) => onPageChange(page)}
        />
      </Stack>
    </div>
  )
}

export default PaginationComponent
