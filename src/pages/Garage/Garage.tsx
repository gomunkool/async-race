import React, {useEffect, useState} from 'react'
import {
  GarageBox,
  InputBox,
  FormButton,
  CarsConrtolBox,
  CarsConrtolButton,
  GarageControlBox,
  PaginationButtonBox,
  PaginationButton
} from './Garage.styled'
import {TextField, Typography} from '@mui/material';
import InputColor from 'react-input-color';
import Car from "../../components/Car/Car";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getCars, createCars, changePagination} from '../../store/features/carsSlice'
import {ICar} from "../../models/ICar";
import {INewCar} from "../../models/INewCar";
import {IPaginationGetCars} from "../../models/IPaginationGetCars";
import {IColor} from "../../models/IColor";


const Garage = (): JSX.Element => {
  const dispatch = useAppDispatch ()
  const cars = useAppSelector (state => state.cars.cars)
  const allCarsInGarage = useAppSelector (state => state.cars.allCars)
  const paginationState = useAppSelector (state => state.cars.pagination)



  const [color, setColor] = useState<IColor> ({});
  const [nameNewCar, setNameNewCar] = useState ('')
  const [newCar, setNewCar] = useState<INewCar> ({name: "", color: ""})
  const [currentPage, setCurrentPage] = useState (paginationState.page)
  const [carsInRace, setCarsInRace] = useState (paginationState.limit)
  const [pagination, setPagination] = useState<IPaginationGetCars> ({page: currentPage, limit: carsInRace})

  useEffect (() => {
    dispatch (getCars (pagination))
  }, [pagination])

  const createNewNameCar = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setNameNewCar (event.target.value)
  }


  const createNewCar = (): void => {
    if (nameNewCar.length >= 2) {
      const updatedNewCar = {
        ...newCar,
        name: nameNewCar,
        color: color.hex,
      }
      dispatch (createCars (updatedNewCar)).then (() => {
        dispatch (getCars (pagination))
      })
      setNewCar (updatedNewCar)
      setNameNewCar ('')
    }
  }


  const countCarsInRace = (action: string): void => {
    let countCars = carsInRace
    if (carsInRace <= 1 && action === 'less') {
      countCars = 6
    } else if (countCars >= 6 && action === 'more') {
      countCars = 1
    } else if (action === 'less') {
      countCars--
    } else if (action === 'more') {
      countCars++
    }

    const paginationCount = {
      ...pagination,
      page: currentPage,
      limit: countCars
    }
    dispatch (getCars (paginationCount))
    setCarsInRace (countCars)
    setPagination (paginationCount)
  }

  const switchCurrentPage = (action: string): void => {
    let page = currentPage
    if (action === "PREV") {
      page--
    } else if (action === "NEXT") {
      page++
    }
    const paginationCount = {
      ...pagination,
      page,
      limit: carsInRace
    }
    dispatch (getCars (paginationCount))
    setCurrentPage (page)
    setPagination (paginationCount)
    dispatch ((changePagination (pagination)))
  }

  return (
    <GarageBox>
      <InputBox component="form" onSubmit={(event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault ();
        createNewCar ();
      }}>
        <TextField id="outlined-basic" label="Create Car" variant="outlined" value={nameNewCar}
                   onChange={createNewNameCar}/>
        <InputColor
          initialValue="#5e72e4"
          onChange={setColor}
          placement="right"
        />
        <FormButton type="submit" variant="outlined">Create</FormButton>
      </InputBox>
      <CarsConrtolBox>
        <CarsConrtolButton variant="contained">Race</CarsConrtolButton>
        <CarsConrtolButton variant="contained">Reset</CarsConrtolButton>
        <CarsConrtolButton variant="contained">Generate Cars</CarsConrtolButton>
      </CarsConrtolBox>
      <GarageControlBox>
        <PaginationButtonBox>
          <PaginationButton variant="contained" disabled={currentPage === 1}
                            onClick={() => switchCurrentPage ('PREV')}>PREV</PaginationButton>
          <Typography variant='h5'>{currentPage}</Typography>
          <PaginationButton variant="contained" disabled={cars.length < 1}
                            onClick={() => switchCurrentPage ('NEXT')}>NEXT</PaginationButton>
        </PaginationButtonBox>
        <Typography variant='h5'>Cars in Garage :{allCarsInGarage}</Typography>
        <PaginationButtonBox>
          <PaginationButton variant="contained" onClick={() => countCarsInRace ('less')}>LESS</PaginationButton>
          <Typography variant='h5'>Cars for race:{carsInRace}</Typography>
          <PaginationButton variant="contained" onClick={() => countCarsInRace ('more')}>MORE</PaginationButton>
        </PaginationButtonBox>
      </GarageControlBox>

      {cars?.map ((car: ICar): JSX.Element => <Car key={car.id} id={car.id} name={car.name} color={car.color}/>)}


    </GarageBox>
  )
}

export default Garage
