import React, {useEffect, useState} from 'react'
import {Modal, Typography, TextField,} from '@mui/material';
import {
  CarBox,
  CarControlButton,
  CarNameTypography,
  RaceBox,
  RaceButtonBox,
  RaceButton,
  FinishLine,
  UpdateModalBox, UpdateModalButton
} from './Car.style'
import {ICar} from "../../models/ICar";
import {FaCarSide} from 'react-icons/fa';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {removeCarById, updateCars} from '../../store/features/carsSlice';
import InputColor from 'react-input-color';
import {IColor} from "../../models/IColor";
import {INewCar} from "../../models/INewCar";
import {IInfoMovement} from "../../models/IInfoMovement";
import axios from "axios";


const Car = ({id, name, color}: ICar): JSX.Element => {

  const dispatch = useAppDispatch ()

  const [updateModalOpen, setUpdateModalOpen] = useState (false)
  const [updateColor, setUpdateColor] = useState<IColor> ({});
  const [updateNameCar, setUpdateNameCar] = useState ((''))
  const [updateCar, setUpdateCar] = useState<INewCar> ({name: '', color: '', id})
  const [infoMovementCar, setInfoMovementCar] = useState<IInfoMovement> ({velocity: null, distance: null})


  const updateNameCarFunction = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setUpdateNameCar (event.target.value)
  }
  const sendInfoUpdateCar = () => {
    if (updateNameCar.length >= 3) {
      const updatedNewCar = {
        ...updateCar,
        name: updateNameCar,
        color: updateColor.hex,
      }
      dispatch (updateCars (updatedNewCar))
    }
  }

  useEffect (() => {
    axios.patch (`http://localhost:3000/engine?status=${'started'}&id=${id}`).then (res => {
      const infoMovement = {
        ...infoMovementCar,
        velocity: res.data.velocity,
        distance: res.data.distance,
      }
      setInfoMovementCar (infoMovement)
    }).catch ((error) => {
      console.error ('Error fetching data:', error)
    })
    // if (status === 'started') {
    //   const resDrive = await axios.patch (`http://localhost:3000/engine?status=${'drive'}&id=${id}`)
    // }
  }, [])

  const startCar = () => {
    axios.patch (`http://localhost:3000/engine?status=${'drive'}&id=${id}`).then(res =>{
      console.log (res.data
      )
    })
  }

  return (
    <CarBox>
      <CarControlButton variant="contained" onClick={() => {
        setUpdateModalOpen (!updateModalOpen)
      }}>Update</CarControlButton>
      <CarControlButton variant="contained" onClick={() => {
        dispatch (removeCarById (id))
      }}>Remove</CarControlButton>
      <CarNameTypography>{name}</CarNameTypography>
      <RaceBox>
        <RaceButtonBox>
          <RaceButton variant="outlined" onClick={() => {
            startCar ()
          }}>START</RaceButton>
          <RaceButton variant="outlined">STOP</RaceButton>
        </RaceButtonBox>
        <FaCarSide style={{height: '80px', width: '100px', color: `${color}`}}/>
      </RaceBox>
      <FinishLine></FinishLine>
      <Modal
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen (!updateModalOpen)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UpdateModalBox>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`Update ${name} car`}
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2}}>
            Сhoose a new color
          </Typography>
          <InputColor
            initialValue="#5e72e4"
            onChange={setUpdateColor}
            placement="right"
          />
          <Typography id="modal-modal-description" sx={{mt: 2}}>
            Сhoose a new name
          </Typography>
          <TextField id="outlined-basic" label="Update Name Car" variant="outlined" value={updateNameCar}
                     onChange={updateNameCarFunction}/>
          <UpdateModalButton variant="contained" onClick={sendInfoUpdateCar}>Update</UpdateModalButton>
        </UpdateModalBox>
      </Modal>
    </CarBox>
  )
}

export default Car
