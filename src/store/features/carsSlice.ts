import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {ICar} from "../../models/ICar";
import {INewCar} from "../../models/INewCar";
import {IPaginationGetCars} from '../../models/IPaginationGetCars'
import axios from "axios";


interface CarsState {
  cars: ICar[];
  allCars: number;
  pagination: IPaginationGetCars
}

const initialState: CarsState = {
  cars: [],
  allCars: 0,
  pagination: {
    page: 1,
    limit: 3
  }
}

export const getCars = createAsyncThunk (
  'cars/getCars',
  async (pagination: IPaginationGetCars, {rejectWithValue, dispatch}) => {
    const res = await axios.get (`http://localhost:3000/garage?_limit=${pagination.limit}&_page=${pagination.page}`,)
    dispatch (setCars (res.data))
    dispatch (changePagination (pagination))
    const resAll = await axios.get (`http://localhost:3000/garage`,)
    dispatch (setAllCars (resAll.data))
  }
)


export const createCars = createAsyncThunk (
  'cars/createCars',
  async (car: INewCar, {rejectWithValue, dispatch}) => {
    await axios.post ('http://localhost:3000/garage',
      car,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }
)

export const removeCarById = createAsyncThunk (
  'cars/removeCarById',
  async (id: number, {rejectWithValue, dispatch}) => {
    await axios.delete (`http://localhost:3000/garage/${id}`)
    dispatch (removeCar (id))
    const resAll = await axios.get (`http://localhost:3000/garage`,)
    dispatch (setAllCars (resAll.data))
  })

export const updateCars = createAsyncThunk (
  'cars/updateCars',
  async (car: INewCar, {rejectWithValue, dispatch}) => {
    await axios.put (`http://localhost:3000/garage/${car.id}`,
      car,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    dispatch (getCars (initialState.pagination))
  }
)

export const carsSlice = createSlice ({
  name: 'cars',
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload
    },
    setAllCars: (state, action) => {
      state.allCars = action.payload.length
    },
    changePagination: (state, action) => {
      state.pagination = {
        ...state.pagination,
        limit: action.payload.limit,
        page: action.payload.page
      }
    },
    removeCar: (state, action) => {
      state.cars = state.cars.filter ((car) => car.id !== action.payload)
    }
  }
})

export const {setCars, setAllCars, removeCar, changePagination} = carsSlice.actions
export default carsSlice.reducer