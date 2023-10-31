import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"
import APIURL from "../constants/api"

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { getState }) => {
    const state = getState() as RootState

    const { page, perPage, searchKey, sortDir, sortKey } = state.setting

    const params = { page, perPage, searchKey, sortDir, sortKey }
    const response = await axios.get(APIURL.api, { params })
    return response.data
  }
)

export const saveTask = createAsyncThunk(
  "tasks/saveTask",
  async (data: { title: string; description: string; priority: string }) => {
    try {
      const response = await axios.post(APIURL.api, data)
      if (response.status === 200) {
        return "success"
      }
    } catch (err) {
      console.error(err)
    }
  }
)

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (data: {
    id: string
    title: string
    description: string
    priority: string
  }) => {
    try {
      const response = await axios.put(`${APIURL.api}/${data.id}`, data)
      if (response.status === 200) {
        return "success"
      }
    } catch (err) {
      console.error(err)
    }
  }
)

export const deleteTasks = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string, { dispatch }) => {
    try {
      const response = await axios.delete(`${APIURL.api}/${id}`)
      dispatch(fetchTasks())
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

export const resetSetting = createAsyncThunk(
  "tasks/resetSetting",
  async (setting: {
    perPage?: number
    page?: number
    searchKey?: string
    sortKey?: string
    sortDir?: string
  }) => {
    return setting
  }
)

const tasksSlice = createSlice({
  name: "task",
  initialState: {
    isLoading: false,
    tasks: [],
    setting: {
      searchKey: "",
      page: 1,
      perPage: 5,
      sortKey: "",
      sortDir: "",
    },
    totalCount: null,
    error: null,
    pending: true,
    completed: true,
    toggle: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false

        const { tasks, totalCount } = action.payload
        state.tasks = tasks
        state.totalCount = totalCount
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(resetSetting.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetSetting.fulfilled, (state, action) => {
        state.isLoading = false
        state.setting = { ...state.setting, ...action.payload }
      })
      .addCase(resetSetting.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export default tasksSlice.reducer
