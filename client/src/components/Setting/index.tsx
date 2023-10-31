import { useState, useMemo } from "react"
import { FaSortDown, FaSortUp, FaSearch } from "react-icons/fa"
import { ThunkDispatch } from "redux-thunk"
import { useDispatch } from "react-redux"
import { AnyAction } from "redux"
import { resetSetting } from "../../features/taskSlice"
import { sortBy } from "../../constants/uiOptions"
import cx from "clsx"
import { SettingStyle } from "../../constants/styles"
import { Setting } from "../../constants/content"

const SettingComponent = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>()
  const [query, setQuery] = useState("")
  const [sortDir, setSortDir] = useState<null | boolean>(null)

  useMemo(() => {
    const setting = { searchKey: query, page: 1 }
    dispatch(resetSetting(setting))
  }, [dispatch, query])

  const handleChangeSearchBar = (e: any) => {
    setQuery(e.target.value)
  }

  const handleChangeSort = (e: any) => {
    const settingSort = { sortKey: e.target.value.toLowerCase(), page: 1 }
    dispatch(resetSetting(settingSort))
  }

  const handleChangeSortDir = () => {
    setSortDir((prevSortDir) => {
      if (prevSortDir === null) {
        dispatch(resetSetting({ sortDir: "asc" }))
        return false
      } else if (prevSortDir === false) {
        dispatch(resetSetting({ sortDir: "desc" }))
        return true
      } else {
        dispatch(resetSetting({ sortDir: "" }))
        return null
      }
    })
  }

  return (
    <div className={cx(SettingStyle.container)}>
      <div className="flex relative">
        <input
          type="text"
          placeholder={Setting.Search}
          onChange={handleChangeSearchBar}
          className={cx(SettingStyle.searchBar)}
        />
        <FaSearch className={cx(SettingStyle.searchIcon)} />
      </div>
      <div className="flex gap-3 items-center">
        <div className=" text-gray-700 sm:block hidden">{Setting.SortBy}</div>
        <select className={cx(SettingStyle.sortBy)} onChange={handleChangeSort}>
          {sortBy.map((item, index) => (
            <option key={index} className="text-gray-600">
              {item.label}
            </option>
          ))}
        </select>
        <div onClick={handleChangeSortDir}>
          <FaSortUp
            className="mb-[-15px]"
            color={sortDir === false ? "black" : "gray"}
          />
          <FaSortDown color={sortDir === true ? "black" : "gray"} />
        </div>
      </div>
    </div>
  )
}

export default SettingComponent
