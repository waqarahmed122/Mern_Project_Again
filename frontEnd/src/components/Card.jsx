import React, { useState } from 'react'
import EditModal from './EditModal'
import axiosInstance from '../../axiosConfig';
import { useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const Card = () => {
  const [post, setPost] = useState([]);
  const [id, setId] = useState('');
  const [selectedExercise, setSelectedExercise] = useState([]);
  React.useEffect(() => {
    let allData = async () => {
      try {
        const { data } = await axiosInstance.get('http://localhost:3000/api/users/activities')
        setPost(data);
        console.log(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    allData()
  }, []);
  console.log(post)
  // const exercises = [
  //   {
  //     icon: "fa fa-bicycle fa-3x mb-3",
  //     activity: "Cycling",
  //     duration: "Duration: 1 hour",
  //   },
  //   {
  //     icon: "fa fa-walking fa-3x mb-3",
  //     activity: "Walking",
  //     duration: "Duration: 45 minutes",
  //   },
  //   {
  //     icon: "fa fa-hiking fa-3x mb-3",
  //     activity: "Hiking",
  //     duration: "Duration: 30 minutes",
  //   },
  //   {
  //     icon: "fa fa-swimmer fa-3x mb-3",
  //     activity: "Swimming",
  //     duration: "Duration: 15 minutes",
  //   },
  //   {
  //     icon: "fa fa-running fa-3x mb-3",
  //     activity: "Running",
  //     duration: "Duration: 25 minutes",
  //   },
  //   {
  //     icon: "fa fa-motorcycle fa-3x mb-3",
  //     activity: "Riding",
  //     duration: "Duration: 35 minutes",
  //   },
  // ];
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  // const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
  // const [previewData, setPreviewData] = useState({
  //   username: "",
  //   activity: "",
  //   duration: "",
  // });
  const handleEditClick = (exercise) => {
    setSelectedExercise(exercise);
    setEditModalOpen(true);
  };
  const handleDelete = async (exercise) => {
    console.log(exercise._id);
    // const body={targetId:exercise._id};
    try {
      const accessToken = localStorage.getItem('Token');
      const { data } = await axios.delete(`http://localhost:3000/api/users/removeActivity/${exercise?._id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      console.log(data.data);
      setPost(data.data)
      location.replace('/exercise')
    } catch (e) {
      alert(e);
    }
    swal({
      title: 'Good job!',
      text: "Your item has been deleted!'",
      icon: 'success',
      button: 'ok!',
    });
  }
  const handleCloseModal = () => {
    setEditModalOpen(false);
  };
  // const handlePreviewClick = (formData) => {
  //   setPreviewData(formData);
  //   setPreviewModalOpen(true);
  // };
  return (
    <div className='row'>
      {!post && null}
      {post.map((exercise, index) => (
        <div key={index} className="col-lg-4 col-md-6">
          <div className="card mb-3">
            <div className="card-body text-center">
              <h5 className="card-title">{exercise.activityname}</h5>
              <h5 className="card-text">{exercise.description}</h5>
              <p className="card-text">{exercise.duration}</p>
              <p className="card-text">{exercise.date}</p>
              <button className="btn btn-dark" onClick={() => handleEditClick(exercise)}><i class="fa-solid fa-pen-to-square"></i></button>
              <button className="btn" onClick={() => { handleDelete(exercise), setId(exercise._id) }} style={{ backgroundColor: "#5f1010", color: "#fff" }}><i class="fa-sharp fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>
      ))}
      <EditModal open={isEditModalOpen} handleClose={handleCloseModal} selectedExercise={selectedExercise} setPost={setPost} />
    </div>

  )
}

export default Card;